import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CrmLinkEntityType, CrmEmailLink, CrmEmailLinkRequest } from '../models/email.model';

export interface CrmEmailLinkResponse {
  id: string;
  connectionId: string;
  externalMessageId: string;
  conversationId?: string;
  subject: string;
  fromEmail: string;
  fromName?: string;
  receivedAtUtc: string;
  provider: string;
  relatedEntityType: string;
  relatedEntityId: string;
  linkedByUserId: string;
  note?: string;
  createdAtUtc: string;
}

@Injectable({ providedIn: 'root' })
export class CrmEmailLinkService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  linkEmail(request: CrmEmailLinkRequest): Observable<CrmEmailLinkResponse> {
    return this.http.post<CrmEmailLinkResponse>(`${this.baseUrl}/api/mailbox/links`, request);
  }

  unlinkEmail(linkId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/mailbox/links/${linkId}`);
  }

  getLinksForEntity(entityType: CrmLinkEntityType, entityId: string): Observable<CrmEmailLinkResponse[]> {
    return this.http.get<CrmEmailLinkResponse[]>(
      `${this.baseUrl}/api/mailbox/links/entity/${entityType}/${entityId}`
    );
  }

  getMyLinks(): Observable<CrmEmailLinkResponse[]> {
    return this.http.get<CrmEmailLinkResponse[]>(`${this.baseUrl}/api/mailbox/links/mine`);
  }
}
