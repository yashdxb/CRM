import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { EmailComposeDialogComponent } from '../components/email-compose-dialog.component';
import { MailComposeService } from '../../../../core/email/mail-compose.service';

@Component({
  selector: 'app-email-compose-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule, EmailComposeDialogComponent],
  template: `
    <div class="compose-page">
      <header class="page-header">
        <div class="page-copy">
          <span class="eyebrow">Mailbox</span>
          <div class="title-row">
            <h1>Compose Email</h1>
            <p-tag severity="info" value="Workspace Composer"></p-tag>
          </div>
          <p>Create, reply, or forward email inside CRM without leaving the mailbox workspace.</p>
        </div>
        <button pButton type="button" class="p-button-text back-button" (click)="goBack()">
          <i class="pi pi-arrow-left"></i>
          <span>Back</span>
        </button>
      </header>

      <app-email-compose-dialog
        [visible]="true"
        [embedded]="true"
        [mode]="composeMode()"
        [replyToEmail]="replyToEmail()"
        [defaultToEmail]="composeContext()?.toEmail ?? ''"
        [defaultToName]="composeContext()?.toName ?? ''"
        [defaultSubject]="composeContext()?.subject ?? ''"
        [defaultRelatedEntityType]="composeContext()?.relatedEntityType"
        [defaultRelatedEntityId]="composeContext()?.relatedEntityId"
        [showRelatedEntity]="composeContext()?.showRelatedEntity ?? true"
        (visibleChange)="!$event ? goBack() : null"
      ></app-email-compose-dialog>
    </div>
  `,
  styles: [`
    .compose-page {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding: 1.25rem;
      max-width: 1180px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.25rem 1.5rem;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
    }

    .page-copy {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .eyebrow {
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #2563eb;
    }

    .title-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    h1 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
      color: #0f172a;
    }

    p {
      margin: 0;
      color: #64748b;
      max-width: 58rem;
    }

    .back-button {
      color: #334155;
      white-space: nowrap;
    }

    @media (max-width: 960px) {
      .compose-page {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
      }
    }
  `]
})
export class EmailComposePage {
  private readonly router = inject(Router);
  private readonly mailCompose = inject(MailComposeService);

  protected readonly composeContext = this.mailCompose.context;
  protected readonly composeMode = computed(() => this.composeContext()?.mode ?? 'new');
  protected readonly replyToEmail = computed(() => this.composeContext()?.replyToEmail ?? undefined);

  protected goBack(): void {
    const returnUrl = this.composeContext()?.returnUrl ?? '/app/mailbox/inbox';
    this.mailCompose.close();
    void this.router.navigateByUrl(returnUrl);
  }
}
