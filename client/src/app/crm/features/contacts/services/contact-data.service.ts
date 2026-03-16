import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CsvImportJob } from '../../../../shared/models/csv-import.model';
import {
  Contact,
  ContactRelationship,
  ContactSearchRequest,
  ContactSearchResponse,
  DuplicateCheckRequest,
  DuplicateCheckResponse,
  MergeContactsRequest,
  MergeContactsResponse,
  SaveContactRequest
} from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  search(request: ContactSearchRequest) {
    let params = new HttpParams();

    if (request.search) {
      params = params.set('search', request.search);
    }
    if (request.accountId) {
      params = params.set('accountId', request.accountId);
    }
    if (request.tag) {
      params = params.set('tag', request.tag);
    }
    if (request.page) {
      params = params.set('page', request.page);
    }
    if (request.pageSize) {
      params = params.set('pageSize', request.pageSize);
    }

    return this.http.get<ContactSearchResponse>(`${this.baseUrl}/api/contacts`, { params });
  }

  getById(id: string) {
    return this.http.get<Contact>(`${this.baseUrl}/api/contacts/${id}`);
  }

  create(payload: SaveContactRequest) {
    return this.http.post<Contact>(`${this.baseUrl}/api/contacts`, payload);
  }

  update(id: string, payload: SaveContactRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/contacts/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/contacts/${id}`);
  }

  bulkAssignOwner(ids: string[], ownerId: string) {
    return this.http.post<void>(`${this.baseUrl}/api/contacts/bulk-assign-owner`, {
      ids,
      ownerId
    });
  }

  bulkUpdateLifecycle(ids: string[], status: string) {
    return this.http.post<void>(`${this.baseUrl}/api/contacts/bulk-update-lifecycle`, {
      ids,
      status
    });
  }

  updateOwner(id: string, ownerId: string) {
    return this.http.patch<void>(`${this.baseUrl}/api/contacts/${id}/owner`, {
      ownerId
    });
  }

  updateLifecycle(id: string, status: string) {
    return this.http.patch<void>(`${this.baseUrl}/api/contacts/${id}/lifecycle`, {
      status
    });
  }

  importCsv(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CsvImportJob>(`${this.baseUrl}/api/contacts/import/queue`, formData);
  }

  // C15: Duplicate detection
  checkDuplicates(request: DuplicateCheckRequest) {
    return this.http.post<DuplicateCheckResponse>(`${this.baseUrl}/api/contacts/check-duplicates`, request);
  }

  // C16: Merge contacts
  mergeContacts(request: MergeContactsRequest) {
    return this.http.post<MergeContactsResponse>(`${this.baseUrl}/api/contacts/merge`, request);
  }

  // C17: Tags
  getAllTags() {
    return this.http.get<string[]>(`${this.baseUrl}/api/contacts/tags`);
  }

  updateTags(id: string, tags: string[]) {
    return this.http.put<void>(`${this.baseUrl}/api/contacts/${id}/tags`, tags);
  }

  // C19: Relationships
  getRelationships(id: string) {
    return this.http.get<ContactRelationship[]>(`${this.baseUrl}/api/contacts/${id}/relationships`);
  }
}
