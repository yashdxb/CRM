import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  PermissionDefinition,
  SecurityLevelDefinition,
  UpsertSecurityLevelRequest,
  ResetPasswordRequest,
  RoleSummary,
  UpsertRoleRequest,
  UpsertUserRequest,
  UserDetailResponse,
  UserListItem,
  UserLookupItem,
  UserSearchRequest,
  UserSearchResponse
} from '../models/user-admin.model';

@Injectable({ providedIn: 'root' })
export class UserAdminDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  search(request: UserSearchRequest) {
    let params = new HttpParams();
    if (request.search) {
      params = params.set('search', request.search);
    }
    if (typeof request.includeInactive === 'boolean') {
      params = params.set('includeInactive', String(request.includeInactive));
    }
    if (request.page) {
      params = params.set('page', String(request.page));
    }
    if (request.pageSize) {
      params = params.set('pageSize', String(request.pageSize));
    }

    return this.http.get<UserSearchResponse>(`${this.baseUrl}/api/users`, { params });
  }

  lookupActive(search?: string, max = 200) {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (max) {
      params = params.set('max', String(max));
    }

    return this.http.get<UserLookupItem[]>(`${this.baseUrl}/api/users/lookup`, { params });
  }

  getUser(id: string) {
    return this.http.get<UserDetailResponse>(`${this.baseUrl}/api/users/${id}`);
  }

  getRoles() {
    return this.http.get<RoleSummary[]>(`${this.baseUrl}/api/roles`);
  }

  getRole(id: string) {
    return this.http.get<RoleSummary>(`${this.baseUrl}/api/roles/${id}`);
  }

  getPermissionCatalog() {
    return this.http
      .get<PermissionDefinition[]>(`${this.baseUrl}/api/roles/permissions`)
      .pipe(
        map((definitions) =>
          definitions.map((definition) => ({
            key: definition.key ?? (definition as any).Key ?? '',
            label:
              definition.label ??
              (definition as any).Label ??
              definition.key ??
              (definition as any).Key ??
              '',
            description: definition.description ?? (definition as any).Description ?? ''
          }))
        )
      );
  }

  getSecurityLevels() {
    return this.http.get<SecurityLevelDefinition[]>(`${this.baseUrl}/api/security-levels`);
  }

  createSecurityLevel(payload: UpsertSecurityLevelRequest) {
    return this.http.post<SecurityLevelDefinition>(`${this.baseUrl}/api/security-levels`, payload);
  }

  updateSecurityLevel(id: string, payload: UpsertSecurityLevelRequest) {
    return this.http.put<SecurityLevelDefinition>(`${this.baseUrl}/api/security-levels/${id}`, payload);
  }

  deleteSecurityLevel(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/security-levels/${id}`);
  }

  createRole(payload: UpsertRoleRequest) {
    return this.http.post<RoleSummary>(`${this.baseUrl}/api/roles`, payload);
  }

  updateRole(id: string, payload: UpsertRoleRequest) {
    return this.http.put<RoleSummary>(`${this.baseUrl}/api/roles/${id}`, payload);
  }

  deleteRole(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/roles/${id}`);
  }

  create(payload: UpsertUserRequest) {
    return this.http.post<UserDetailResponse>(`${this.baseUrl}/api/users`, payload);
  }

  update(id: string, payload: UpsertUserRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/users/${id}`, payload);
  }

  resetPassword(id: string, payload: ResetPasswordRequest) {
    return this.http.post<void>(`${this.baseUrl}/api/users/${id}/reset-password`, payload);
  }

  resendInvite(id: string) {
    return this.http.post<void>(`${this.baseUrl}/api/users/${id}/resend-invite`, {});
  }

  activate(id: string) {
    return this.http.post<void>(`${this.baseUrl}/api/users/${id}/activate`, {});
  }

  deactivate(id: string) {
    return this.http.post<void>(`${this.baseUrl}/api/users/${id}/deactivate`, {});
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/users/${id}`);
  }
}
