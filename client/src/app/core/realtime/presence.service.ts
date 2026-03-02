import { Injectable, NgZone } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { readTokenContext, readUserId } from '../auth/token.utils';
import { getTenantKey, resolveTenantKeyFromHost } from '../tenant/tenant.utils';

export type PresenceConnectionState = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';

@Injectable({ providedIn: 'root' })
export class PresenceService {
  private readonly onlineUsersSubject = new BehaviorSubject<Set<string>>(new Set());
  private readonly connectionStateSubject = new BehaviorSubject<PresenceConnectionState>('disconnected');
  private connection: HubConnection | null = null;
  private localUserId: string | null = null;

  constructor(private readonly zone: NgZone) {}

  get onlineUsers$() {
    return this.onlineUsersSubject.asObservable();
  }

  get connectionState$() {
    return this.connectionStateSubject.asObservable();
  }

  connect() {
    const context = readTokenContext();
    const token = context?.token ?? '';
    if (!token) {
      this.connectionStateSubject.next('disconnected');
      return;
    }

    this.localUserId = readUserId();

    if (
      this.connection &&
      (this.connection.state === HubConnectionState.Connected ||
        this.connection.state === HubConnectionState.Connecting ||
        this.connection.state === HubConnectionState.Reconnecting)
    ) {
      this.connectionStateSubject.next(this.mapHubState(this.connection.state));
      return;
    }

    const tenantKey = getTenantKey();
    const hostKey = typeof window !== 'undefined' ? resolveTenantKeyFromHost(window.location.hostname) : null;
    const resolvedTenantKey = tenantKey && !(tenantKey === 'default' && hostKey === null) ? tenantKey : null;
    const headers: Record<string, string> = {};
    if (resolvedTenantKey) {
      headers['X-Tenant-Key'] = resolvedTenantKey;
    }

    const hubUrl = resolvedTenantKey
      ? `${environment.apiUrl}/api/hubs/presence?tenantKey=${encodeURIComponent(resolvedTenantKey)}`
      : `${environment.apiUrl}/api/hubs/presence`;

    this.connection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => readTokenContext()?.token ?? '',
        withCredentials: false,
        headers
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Error)
      .build();

    this.connection.onreconnecting(() => {
      this.zone.run(() => {
        this.connectionStateSubject.next('reconnecting');
      });
    });

    this.connection.onreconnected(() => {
      this.zone.run(() => {
        this.connectionStateSubject.next('connected');
      });
    });

    this.connection.onclose(() => {
      this.zone.run(() => {
        this.connectionStateSubject.next('disconnected');
      });
    });

    this.connection.on('presenceSnapshot', (users: string[]) => {
      this.zone.run(() => {
        const next = new Set(users ?? []);
        if (this.localUserId) {
          next.add(this.localUserId);
        }
        this.onlineUsersSubject.next(next);
      });
    });

    this.connection.on('presenceChanged', (userId: string, isOnline: boolean) => {
      this.zone.run(() => {
        const next = new Set(this.onlineUsersSubject.value);
        if (isOnline) {
          next.add(userId);
        } else {
          next.delete(userId);
        }
        if (
          this.localUserId &&
          userId === this.localUserId &&
          !isOnline &&
          this.connection?.state === HubConnectionState.Connected
        ) {
          next.add(this.localUserId);
        }
        this.onlineUsersSubject.next(next);
      });
    });

    this.connectionStateSubject.next('connecting');
    this.connection.start()
      .then(() => {
        this.zone.run(() => {
          this.connectionStateSubject.next('connected');
        });
      })
      .catch(() => {
        this.zone.run(() => {
          this.connectionStateSubject.next('disconnected');
        });
        // Swallow connection errors; UI falls back to server snapshot.
      });
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop().catch(() => {
        // Ignore errors during shutdown.
      });
      this.connection = null;
    }
    this.localUserId = null;
    this.onlineUsersSubject.next(new Set());
    this.connectionStateSubject.next('disconnected');
  }

  private mapHubState(state: HubConnectionState): PresenceConnectionState {
    switch (state) {
      case HubConnectionState.Connected:
        return 'connected';
      case HubConnectionState.Connecting:
        return 'connecting';
      case HubConnectionState.Reconnecting:
        return 'reconnecting';
      default:
        return 'disconnected';
    }
  }
}
