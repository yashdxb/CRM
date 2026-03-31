import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmailRelationType } from '../../crm/features/emails/models/email.model';
import { ComposeMode, MailboxEmail } from '../../crm/features/emails/models/email.model';

export interface MailComposeContext {
  toEmail?: string;
  toName?: string;
  subject?: string;
  relatedEntityType?: EmailRelationType;
  relatedEntityId?: string;
  showRelatedEntity?: boolean;
  mode?: ComposeMode;
  replyToEmail?: MailboxEmail | null;
  returnUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class MailComposeService {
  private readonly router = inject(Router);
  readonly context = signal<MailComposeContext | null>(null);

  open(context: MailComposeContext = {}): void {
    this.context.set({
      ...context,
      returnUrl: context.returnUrl ?? this.router.url
    });
    void this.router.navigate(['/app/mailbox/compose']);
  }

  close(): void {
    this.context.set(null);
  }
}
