import { Injectable, NgZone } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { readTokenContext } from '../auth/token.utils';

@Injectable({ providedIn: 'root' })
export class PresenceService {
  private readonly onlineUsersSubject = new BehaviorSubject<Set<string>>(new Set());
  private connection: HubConnection | null = null;

  constructor(private readonly zone: NgZone) {}

  get onlineUsers$() {
    return this.onlineUsersSubject.asObservable();
  }

  connect() {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    const accessToken = readTokenContext()?.token ?? localStorage.getItem('auth_token') ?? '';
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hubs/presence`, {
        accessTokenFactory: () => accessToken,
        withCredentials: false
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Error)
      .build();

    this.connection.on('presenceSnapshot', (users: string[]) => {
      this.zone.run(() => {
        this.onlineUsersSubject.next(new Set(users ?? []));
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
        this.onlineUsersSubject.next(next);
      });
    });

    this.connection.start().catch(() => {
      // Swallow connection errors; UI falls back to server snapshot.
    });
  }
}
