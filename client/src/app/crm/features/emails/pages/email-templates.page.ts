import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';

import { EmailTemplateListItem } from '../models/email.model';
import { EmailDataService } from '../services/email-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';

@Component({
  selector: 'app-email-templates-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    TableModule,
    TagModule,
    SkeletonModule,
    TooltipModule,
    DialogModule,
    TextareaModule,
    BreadcrumbsComponent
  ],
  templateUrl: './email-templates.page.html',
  styleUrl: './email-templates.page.scss'
})
export class EmailTemplatesPage implements OnInit {
  private readonly emailService = inject(EmailDataService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);

  protected readonly templates = signal<EmailTemplateListItem[]>([]);
  protected readonly loading = signal(true);
  protected showCreateDialog = false;
  protected showEditDialog = false;
  protected editingTemplate: EmailTemplateListItem | null = null;

  protected newTemplate = {
    name: '',
    subject: '',
    bodyHtml: '',
    variables: ''
  };

  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.emailsManage);
  });

  ngOnInit(): void {
    this.loadTemplates();
  }

  protected loadTemplates(): void {
    this.loading.set(true);
    this.emailService.searchTemplates({}).subscribe({
      next: (response) => {
        this.templates.set(response.items);
        this.loading.set(false);
      },
      error: () => {
        this.toastService.show('error', 'Failed to load templates');
        this.loading.set(false);
      }
    });
  }

  protected openCreateDialog(): void {
    this.newTemplate = { name: '', subject: '', bodyHtml: '', variables: '' };
    this.showCreateDialog = true;
  }

  protected openEditDialog(template: EmailTemplateListItem): void {
    this.editingTemplate = template;
    // Load full template details
    this.emailService.getTemplate(template.id).subscribe({
      next: (detail) => {
        this.newTemplate = {
          name: detail.name,
          subject: detail.subject,
          bodyHtml: detail.htmlBody,
          variables: detail.variables ?? ''
        };
        this.showEditDialog = true;
      },
      error: () => {
        this.toastService.show('error', 'Failed to load template details');
      }
    });
  }

  protected createTemplate(): void {
    if (!this.newTemplate.name || !this.newTemplate.subject) {
      this.toastService.show('error', 'Name and subject are required');
      return;
    }

    this.emailService.createTemplate({
      name: this.newTemplate.name,
      subject: this.newTemplate.subject,
      htmlBody: this.newTemplate.bodyHtml,
      variables: this.newTemplate.variables || undefined
    }).subscribe({
      next: () => {
        this.showCreateDialog = false;
        this.loadTemplates();
        this.toastService.show('success', 'Template created successfully');
      },
      error: () => {
        this.toastService.show('error', 'Failed to create template');
      }
    });
  }

  protected updateTemplate(): void {
    if (!this.editingTemplate) return;
    if (!this.newTemplate.name || !this.newTemplate.subject) {
      this.toastService.show('error', 'Name and subject are required');
      return;
    }

    this.emailService.updateTemplate(this.editingTemplate.id, {
      name: this.newTemplate.name,
      subject: this.newTemplate.subject,
      htmlBody: this.newTemplate.bodyHtml,
      variables: this.newTemplate.variables || undefined
    }).subscribe({
      next: () => {
        this.showEditDialog = false;
        this.editingTemplate = null;
        this.loadTemplates();
        this.toastService.show('success', 'Template updated successfully');
      },
      error: () => {
        this.toastService.show('error', 'Failed to update template');
      }
    });
  }

  protected deleteTemplate(template: EmailTemplateListItem): void {
    if (!confirm(`Delete template "${template.name}"?`)) return;

    this.emailService.deleteTemplate(template.id).subscribe({
      next: () => {
        this.loadTemplates();
        this.toastService.show('success', 'Template deleted');
      },
      error: () => {
        this.toastService.show('error', 'Failed to delete template');
      }
    });
  }
}
