import { Injectable, NgZone } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { readTokenContext, readUserId } from '../auth/token.utils';
import { getTenantKey, resolveTenantKeyFromHost } from '../tenant/tenant.utils';

@Injectable({ providedIn: 'root' })
export class PresenceService {
  private readonly onlineUsersSubject = new BehaviorSubject<Set<string>>(new Set());
  private connection: HubConnection | null = null;
  private localUserId: string | null = null;

  constructor(private readonly zone: NgZone) {}

  get onlineUsers$() {
    return this.onlineUsersSubject.asObservable();
  }

  connect() {
    const context = readTokenContext();
    const token = context?.token ?? '';
    if (!token) {
      return;
    }

    this.localUserId = readUserId();

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
      .withUrl(`${environment.apiUrl}/api/hubs/presence`, {
        accessTokenFactory: () => readTokenContext()?.token ?? '',
        withCredentials: false,
        headers
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Error)
      .build();

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

    this.connection.start().catch(() => {
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
  }
}
