import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Activity, UpsertActivityRequest } from '../models/activity.model';
import { environment } from '../../../../../environments/environment';

export interface ActivitySearchRequest {
  status?: 'Upcoming' | 'Completed' | 'Overdue';
  page?: number;
  pageSize?: number;
  search?: string;
  ownerId?: string;
  type?: Activity['type'];
  relatedEntityType?: Activity['relatedEntityType'];
  relatedEntityId?: string;
}

export interface ActivitySearchResponse {
  items: Activity[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ActivityDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  search(request: ActivitySearchRequest) {
    let params = new HttpParams();

    if (request.status) {
      params = params.set('status', request.status);
    }
    if (request.search) {
      params = params.set('search', request.search);
    }
    if (request.type) {
      params = params.set('type', request.type);
    }
    if (request.page) {
      params = params.set('page', request.page);
    }
    if (request.pageSize) {
      params = params.set('pageSize', request.pageSize);
    }
    if (request.ownerId) {
      params = params.set('ownerId', request.ownerId);
    }
    if (request.relatedEntityType) {
      params = params.set('relatedEntityType', request.relatedEntityType);
    }
    if (request.relatedEntityId) {
      params = params.set('relatedEntityId', request.relatedEntityId);
    }

    return this.http.get<ActivitySearchResponse>(`${this.baseUrl}/api/activities`, { params });
  }

  get(id: string) {
    return this.http.get<Activity>(`${this.baseUrl}/api/activities/${id}`);
  }

  create(payload: UpsertActivityRequest) {
    return this.http.post<Activity>(`${this.baseUrl}/api/activities`, payload);
  }

  update(id: string, payload: UpsertActivityRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/activities/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/activities/${id}`);
  }
}
