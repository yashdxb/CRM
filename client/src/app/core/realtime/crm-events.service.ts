import { Injectable, NgZone, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { readTokenContext } from '../auth/token.utils';
import { getTenantKey, resolveTenantKeyFromHost } from '../tenant/tenant.utils';
import { NotificationService, NotificationType } from '../notifications/notification.service';

interface CrmEventEnvelope {
  eventType: string;
  tenantId: string;
  occurredAtUtc: string;
  payload?: Record<string, unknown> | null;
}

@Injectable({ providedIn: 'root' })
export class CrmEventsService {
  private readonly notificationService = inject(NotificationService);
  private readonly eventsSubject = new Subject<CrmEventEnvelope>();
  private connection: HubConnection | null = null;

  constructor(private readonly zone: NgZone) {}

  readonly events$ = this.eventsSubject.asObservable();

  connect() {
    const token = readTokenContext()?.token ?? '';
    if (!token) {
      return;
    }

    if (
      this.connection &&
      (this.connection.state === HubConnectionState.Connected ||
        this.connection.state === HubConnectionState.Connecting ||
        this.connection.state === HubConnectionState.Reconnecting)
    ) {
      return;
    }

    const tenantKey = getTenantKey();
    const hostKey = typeof window !== 'undefined' ? resolveTenantKeyFromHost(window.location.hostname) : null;
    const headers: Record<string, string> = {};
    if (tenantKey && !(tenantKey === 'default' && hostKey === null)) {
      headers['X-Tenant-Key'] = tenantKey;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/api/hubs/crm-events`, {
        accessTokenFactory: () => readTokenContext()?.token ?? '',
        withCredentials: false,
        headers
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Error)
      .build();

    this.connection.on('crmEvent', (envelope: CrmEventEnvelope) => {
      this.zone.run(() => this.handleEvent(envelope));
    });

    this.connection.start().catch(() => {
      // Realtime is best-effort; UX falls back to explicit refresh actions.
    });
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop().catch(() => {
        // Ignore shutdown errors.
      });
      this.connection = null;
    }
  }

  private handleEvent(envelope: CrmEventEnvelope | null | undefined) {
    if (!envelope?.eventType) {
      return;
    }

    this.eventsSubject.next(envelope);

    const title = this.resolveTitle(envelope);
    if (!title) {
      return;
    }

    const detail = this.resolveDetail(envelope);
    const type = this.resolveType(envelope);
    this.notificationService.pushInbox(type, title, detail);
  }

  private resolveTitle(envelope: CrmEventEnvelope): string {
    switch (envelope.eventType) {
      case 'notification.alert':
        return String(envelope.payload?.['title'] ?? 'Alert');
      case 'decision.created':
        return 'New decision request';
      case 'decision.updated':
        return 'Decision updated';
      case 'decision.sla.escalated':
        return 'Decision escalated';
      case 'decision.pending-count':
        return '';
      case 'opportunity.stage.changed':
        return 'Opportunity stage changed';
      case 'renewal.automation.completed':
        return 'Renewal automation update';
      case 'email.delivery.status':
        return 'Email delivery update';
      default:
        return 'Realtime update';
    }
  }

  private resolveDetail(envelope: CrmEventEnvelope): string | undefined {
    switch (envelope.eventType) {
      case 'opportunity.stage.changed': {
        const name = String(envelope.payload?.['opportunityName'] ?? 'Opportunity');
        const from = String(envelope.payload?.['previousStage'] ?? 'previous');
        const to = String(envelope.payload?.['nextStage'] ?? 'next');
        return `${name}: ${from} -> ${to}`;
      }
      case 'decision.created':
      case 'decision.updated':
      case 'decision.sla.escalated': {
        const status = envelope.payload?.['status'];
        return status ? `Status: ${String(status)}` : undefined;
      }
      case 'email.delivery.status': {
        const to = envelope.payload?.['toEmail'];
        const status = envelope.payload?.['status'];
        return to && status ? `${String(to)}: ${String(status)}` : undefined;
      }
      default:
        return undefined;
    }
  }

  private resolveType(envelope: CrmEventEnvelope): NotificationType {
    if (envelope.eventType === 'decision.sla.escalated') {
      return 'warning';
    }
    if (envelope.eventType === 'email.delivery.status') {
      return String(envelope.payload?.['status'] ?? '').toLowerCase() === 'failed' ? 'error' : 'success';
    }
    return 'info';
  }
}
