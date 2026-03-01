import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface EmailConnection {
  id: string;
  provider: string;
  providerName: string;
  emailAddress: string;
  displayName: string;
  isPrimary: boolean;
  isActive: boolean;
  lastSyncAtUtc: string | null;
  lastError: string | null;
  createdAtUtc: string;
}

export interface EmailConnectionListResponse {
  items: EmailConnection[];
}

export interface StartOAuthRequest {
  provider: string;
  redirectUri: string;
}

export interface StartOAuthResponse {
  authorizationUrl: string;
  state: string;
}

export interface CompleteOAuthRequest {
  provider: string;
  authorizationCode: string;
  redirectUri: string;
  state: string;
}

export interface ConnectionTestResponse {
  success: boolean;
  errorMessage: string | null;
  inboxCount: number | null;
}

@Injectable({ providedIn: 'root' })
export class EmailConnectionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/email-connections`;

  /**
   * Gets all email accounts connected by the current user.
   */
  getConnections(): Observable<EmailConnectionListResponse> {
    return this.http.get<EmailConnectionListResponse>(this.baseUrl);
  }

  /**
   * Gets a specific connection.
   */
  getConnection(id: string): Observable<EmailConnection> {
    return this.http.get<EmailConnection>(`${this.baseUrl}/${id}`);
  }

  /**
   * Initiates OAuth flow to connect an email provider.
   * Returns auth URL to redirect user to.
   */
  startOAuth(provider: string, redirectUri: string): Observable<StartOAuthResponse> {
    return this.http.post<StartOAuthResponse>(`${this.baseUrl}/authorize`, {
      provider,
      redirectUri
    } as StartOAuthRequest);
  }

  /**
   * Completes OAuth flow after user returns with authorization code.
   */
  completeOAuth(
    provider: string,
    authorizationCode: string,
    redirectUri: string,
    state: string
  ): Observable<EmailConnection> {
    return this.http.post<EmailConnection>(`${this.baseUrl}/callback`, {
      provider,
      authorizationCode,
      redirectUri,
      state
    } as CompleteOAuthRequest);
  }

  /**
   * Sets a connection as the user's primary email account.
   */
  setPrimary(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/set-primary`, {});
  }

  /**
   * Tests a connection by attempting to read from the mailbox.
   */
  testConnection(id: string): Observable<ConnectionTestResponse> {
    return this.http.post<ConnectionTestResponse>(`${this.baseUrl}/${id}/test`, {});
  }

  /**
   * Disconnects/removes an email connection.
   */
  disconnect(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
