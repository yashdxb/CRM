import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export type AttachmentEntityType = 'Account' | 'Contact' | 'Opportunity' | 'Lead';

export interface AttachmentItem {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  uploadedBy?: string | null;
  createdAtUtc: string;
}

@Injectable({ providedIn: 'root' })
export class AttachmentDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  list(relatedEntityType: AttachmentEntityType, relatedEntityId: string) {
    const params = new HttpParams()
      .set('relatedEntityType', relatedEntityType)
      .set('relatedEntityId', relatedEntityId);
    return this.http.get<AttachmentItem[]>(`${this.baseUrl}/api/attachments`, { params });
  }

  upload(file: File, relatedEntityType: AttachmentEntityType, relatedEntityId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('relatedEntityType', relatedEntityType);
    formData.append('relatedEntityId', relatedEntityId);
    return this.http.post<AttachmentItem>(`${this.baseUrl}/api/attachments`, formData);
  }

  downloadUrl(id: string) {
    return `${this.baseUrl}/api/attachments/${id}/download`;
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/attachments/${id}`);
  }
}
