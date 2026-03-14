import { Injectable, NgZone, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, HttpTransportType, LogLevel } from '@microsoft/signalr';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { readTokenContext } from '../auth/token.utils';
import { getTenantKey, resolveTenantKeyFromHost } from '../tenant/tenant.utils';
import { NotificationService, NotificationType } from '../notifications/notification.service';
import { TenantContextService } from '../tenant/tenant-context.service';

interface CrmEventEnvelope {
  eventType: string;
  tenantId: string;
  occurredAtUtc: string;
  schemaVersion?: number;
  correlationId?: string;
  payload?: Record<string, unknown> | null;
}

type PresenceRegistration = { entityType: string; recordId: string };
const GUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const IS_DEV = !environment.production;

@Injectable({ providedIn: 'root' })
export class CrmEventsService {
  private readonly tenantContext = inject(TenantContextService);
  private readonly notificationService = inject(NotificationService);
  private readonly eventsSubject = new Subject<CrmEventEnvelope>();
  private featureFlags: Record<string, boolean> = {};
  private featureFlagsLoaded = false;
  private featureFlagsLoadPromise: Promise<void> | null = null;
  private connection: HubConnection | null = null;
  private pendingPresence = new Map<string, PresenceRegistration>();

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

    void this.ensureFeatureFlagsLoaded();

    const tenantKey = getTenantKey();
    const hostKey = typeof window !== 'undefined' ? resolveTenantKeyFromHost(window.location.hostname) : null;
    const resolvedTenantKey = (tenantKey && tenantKey.trim()) || hostKey || null;
    const headers: Record<string, string> = {};
    if (resolvedTenantKey) {
      headers['X-Tenant-Key'] = resolvedTenantKey;
    }

    const hubUrl = resolvedTenantKey
      ? `${environment.apiUrl}/api/hubs/crm-events?tenantKey=${encodeURIComponent(resolvedTenantKey)}`
      : `${environment.apiUrl}/api/hubs/crm-events`;

    this.connection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => readTokenContext()?.token ?? '',
        withCredentials: false,
        headers,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.None)
      .build();

    this.connection.on('crmEvent', (envelope: CrmEventEnvelope) => {
      this.zone.run(() => this.handleEvent(envelope));
    });

    this.connection.onreconnected(() => {
      if (IS_DEV) console.debug('[CrmEvents] SignalR reconnected — re-flushing presence');
      this.flushPendingPresence();
    });

    if (IS_DEV) console.debug('[CrmEvents] Starting SignalR connection...');
    this.connection.start().then(() => {
      if (IS_DEV) console.debug('[CrmEvents] SignalR connected successfully');
      this.flushPendingPresence();
    }).catch((err) => {
      this.connection = null;
      console.warn('[CrmEvents] SignalR connection failed:', err);
    });
  }

  isFeatureEnabled(flag: string): boolean {
    return this.featureFlags?.[flag] === true;
  }

  joinRecordPresence(entityType: string, recordId: string) {
    if (!this.isValidRecordId(recordId)) {
      return;
    }

    const key = `${entityType.toLowerCase()}:${recordId}`;
    this.pendingPresence.set(key, { entityType, recordId });
    if (IS_DEV) console.debug('[CrmEvents] joinRecordPresence called:', { entityType, recordId, key });

    this.flushPendingPresence();
  }

  leaveRecordPresence(entityType: string, recordId: string) {
    if (!this.isValidRecordId(recordId)) {
      return;
    }

    const key = `${entityType.toLowerCase()}:${recordId}`;
    this.pendingPresence.delete(key);

    if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
      return;
    }

    this.connection.invoke('LeaveRecordPresence', entityType, recordId).catch(() => {
      // Presence is best effort.
    });
  }

  setRecordEditingState(entityType: string, recordId: string, isEditing: boolean) {
    if (!this.isValidRecordId(recordId)) {
      return;
    }

    if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
      return;
    }

    this.connection.invoke('SetRecordEditingState', entityType, recordId, isEditing).catch(() => {
      // Presence is best effort.
    });
  }

  sendDirectMessage(recipientUserId: string, message: string): Promise<void> {
    if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
      return Promise.reject(new Error('Realtime connection is not ready.'));
    }

    return this.connection.invoke('SendDirectMessage', recipientUserId, message);
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

    if (IS_DEV && envelope.eventType.startsWith('record.presence')) {
      console.debug('[CrmEvents] Received presence event:', envelope);
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
      case 'dashboard.metrics.delta':
      case 'dashboard.metrics.refresh-requested':
      case 'pipeline.lead.moved':
      case 'pipeline.lead.created':
      case 'pipeline.lead.updated':
      case 'pipeline.lead.deleted':
      case 'entity.crud.changed':
      case 'import.job.progress':
      case 'record.presence.snapshot':
      case 'record.presence.changed':
      case 'assistant.chat.token':
      case 'assistant.chat.completed':
      case 'assistant.chat.failed':
      case 'chat.direct.message':
        return '';
      default:
        return '';
    }
  }

  private resolveDetail(envelope: CrmEventEnvelope): string | undefined {
    switch (envelope.eventType) {
      case 'notification.alert':
        return String(
          envelope.payload?.['detail']
          ?? envelope.payload?.['message']
          ?? ''
        ) || undefined;
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

  private flushPendingPresence() {
    if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
      return;
    }

    for (const [key, registration] of this.pendingPresence.entries()) {
      if (!this.isValidRecordId(registration.recordId)) {
        this.pendingPresence.delete(key);
        continue;
      }

      this.connection.invoke('JoinRecordPresence', registration.entityType, registration.recordId)
        .then(() => {
          if (IS_DEV) console.debug('[CrmEvents] JoinRecordPresence succeeded:', registration);
        })
        .catch((err) => console.warn('[CrmEvents] JoinRecordPresence failed:', registration, err));
    }
  }

  private isValidRecordId(recordId: string): boolean {
    return GUID_PATTERN.test(recordId ?? '');
  }

  private ensureFeatureFlagsLoaded(force = false): Promise<void> {
    if (!force && this.featureFlagsLoaded) {
      return Promise.resolve();
    }

    if (this.featureFlagsLoadPromise) {
      return this.featureFlagsLoadPromise;
    }

    this.featureFlagsLoadPromise = firstValueFrom(this.tenantContext.getTenantContext())
      .then((context) => {
        this.featureFlags = context.featureFlags ?? {};
        this.featureFlagsLoaded = true;
      })
      .catch(() => {
        if (!this.featureFlagsLoaded) {
          this.featureFlags = {};
          this.featureFlagsLoaded = true;
        }
      })
      .finally(() => {
        this.featureFlagsLoadPromise = null;
      });

    return this.featureFlagsLoadPromise;
  }
}
