import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  EmailDetail,
  EmailSearchRequest,
  EmailSearchResponse,
  EmailStats,
  EmailTemplateDetail,
  SendEmailRequest,
  TemplateSearchRequest,
  TemplateSearchResponse,
  UpsertTemplateRequest
} from '../models/email.model';

@Injectable({ providedIn: 'root' })
export class EmailDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // ============ EMAIL LOG OPERATIONS ============

  search(request: EmailSearchRequest) {
    let params = new HttpParams();

    if (request.search) {
      params = params.set('search', request.search);
    }
    if (request.status) {
      params = params.set('status', request.status);
    }
    if (request.relatedEntityType) {
      params = params.set('relatedEntityType', request.relatedEntityType);
    }
    if (request.relatedEntityId) {
      params = params.set('relatedEntityId', request.relatedEntityId);
    }
    if (request.senderId) {
      params = params.set('senderId', request.senderId);
    }
    if (request.fromDate) {
      params = params.set('fromDate', request.fromDate);
    }
    if (request.toDate) {
      params = params.set('toDate', request.toDate);
    }
    if (request.page) {
      params = params.set('page', request.page);
    }
    if (request.pageSize) {
      params = params.set('pageSize', request.pageSize);
    }

    return this.http.get<EmailSearchResponse>(`${this.baseUrl}/api/emails`, { params });
  }

  get(id: string) {
    return this.http.get<EmailDetail>(`${this.baseUrl}/api/emails/${id}`);
  }

  send(request: SendEmailRequest) {
    return this.http.post<EmailDetail>(`${this.baseUrl}/api/emails`, request);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/emails/${id}`);
  }

  getStats() {
    return this.http.get<EmailStats>(`${this.baseUrl}/api/emails/stats`);
  }

  // ============ TEMPLATE OPERATIONS ============

  searchTemplates(request: TemplateSearchRequest) {
    let params = new HttpParams();

    if (request.search) {
      params = params.set('search', request.search);
    }
    if (request.category) {
      params = params.set('category', request.category);
    }
    if (request.isActive !== undefined) {
      params = params.set('isActive', request.isActive);
    }
    if (request.page) {
      params = params.set('page', request.page);
    }
    if (request.pageSize) {
      params = params.set('pageSize', request.pageSize);
    }

    return this.http.get<TemplateSearchResponse>(`${this.baseUrl}/api/emails/templates`, { params });
  }

  getTemplate(id: string) {
    return this.http.get<EmailTemplateDetail>(`${this.baseUrl}/api/emails/templates/${id}`);
  }

  createTemplate(request: UpsertTemplateRequest) {
    return this.http.post<EmailTemplateDetail>(`${this.baseUrl}/api/emails/templates`, request);
  }

  updateTemplate(id: string, request: UpsertTemplateRequest) {
    return this.http.put<EmailTemplateDetail>(`${this.baseUrl}/api/emails/templates/${id}`, request);
  }

  deleteTemplate(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/emails/templates/${id}`);
  }
}
