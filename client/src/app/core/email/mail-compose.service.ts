import { Injectable, signal } from '@angular/core';
import { EmailRelationType } from '../../crm/features/emails/models/email.model';

export interface MailComposeContext {
  toEmail?: string;
  toName?: string;
  subject?: string;
  relatedEntityType?: EmailRelationType;
  relatedEntityId?: string;
  showRelatedEntity?: boolean;
}

@Injectable({ providedIn: 'root' })
export class MailComposeService {
  readonly visible = signal(false);
  readonly context = signal<MailComposeContext | null>(null);

  open(context: MailComposeContext = {}): void {
    this.context.set(context);
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
    this.context.set(null);
  }
}
