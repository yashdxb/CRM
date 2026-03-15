import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer, CustomerDetail, CustomerSearchRequest, CustomerSearchResponse, CustomerStatus, AccountTeamMember } from '../models/customer.model';
import { environment } from '../../../../../environments/environment';
import { CsvImportJob } from '../../../../shared/models/csv-import.model';

export interface SaveCustomerRequest {
  name: string;
  accountNumber?: string;
  industry?: string;
  website?: string;
  phone?: string;
  lifecycleStage?: CustomerStatus;
  description?: string;
  ownerId?: string;
  parentAccountId?: string;
  territory?: string;
  annualRevenue?: number;
  numberOfEmployees?: number;
  accountType?: string;
  rating?: string;
  accountSource?: string;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
  billingCountry?: string;
  shippingStreet?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  search(request: CustomerSearchRequest) {
    let params = new HttpParams();

    if (request.search) {
      params = params.set('search', request.search);
    }
    if (request.status) {
      params = params.set('status', request.status);
    }
    if (request.page) {
      params = params.set('page', request.page);
    }
    if (request.pageSize) {
      params = params.set('pageSize', request.pageSize);
    }
    if (request.sortBy) {
      params = params.set('sortBy', request.sortBy);
    }
    if (request.sortDirection) {
      params = params.set('sortDirection', request.sortDirection);
    }
    if (request.industry) {
      params = params.set('industry', request.industry);
    }
    if (request.territory) {
      params = params.set('territory', request.territory);
    }
    if (request.ownerId) {
      params = params.set('ownerId', request.ownerId);
    }
    if (request.createdFrom) {
      params = params.set('createdFrom', request.createdFrom);
    }
    if (request.createdTo) {
      params = params.set('createdTo', request.createdTo);
    }
    if (request.minRevenue != null) {
      params = params.set('minRevenue', request.minRevenue);
    }
    if (request.maxRevenue != null) {
      params = params.set('maxRevenue', request.maxRevenue);
    }

    return this.http.get<CustomerSearchResponse>(`${this.baseUrl}/api/customers`, { params });
  }

  getById(id: string) {
    return this.http.get<Customer>(`${this.baseUrl}/api/customers/${id}`);
  }

  getDetail(id: string) {
    return this.http.get<CustomerDetail>(`${this.baseUrl}/api/customers/${id}/detail`);
  }

  getRelatedAccounts(id: string) {
    return this.http.get<Customer[]>(`${this.baseUrl}/api/customers/${id}/related-accounts`);
  }

  getTeamMembers(id: string) {
    return this.http.get<AccountTeamMember[]>(`${this.baseUrl}/api/customers/${id}/team-members`);
  }

  addTeamMember(id: string, userId: string, role: string) {
    return this.http.post<AccountTeamMember>(`${this.baseUrl}/api/customers/${id}/team-members`, { userId, role });
  }

  removeTeamMember(id: string, memberId: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/customers/${id}/team-members/${memberId}`);
  }

  create(payload: SaveCustomerRequest) {
    return this.http.post<Customer>(`${this.baseUrl}/api/customers`, payload);
  }

  update(id: string, payload: SaveCustomerRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/customers/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/customers/${id}`);
  }

  bulkAssignOwner(ids: string[], ownerId: string) {
    return this.http.post<void>(`${this.baseUrl}/api/customers/bulk-assign-owner`, {
      ids,
      ownerId
    });
  }

  bulkUpdateLifecycle(ids: string[], status: CustomerStatus) {
    return this.http.post<void>(`${this.baseUrl}/api/customers/bulk-update-lifecycle`, {
      ids,
      status
    });
  }

  updateOwner(id: string, ownerId: string) {
    return this.http.patch<void>(`${this.baseUrl}/api/customers/${id}/owner`, {
      ownerId
    });
  }

  updateLifecycle(id: string, status: CustomerStatus) {
    return this.http.patch<void>(`${this.baseUrl}/api/customers/${id}/lifecycle`, {
      status
    });
  }

  importCsv(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CsvImportJob>(`${this.baseUrl}/api/customers/import/queue`, formData);
  }

  checkDuplicate(params: { name?: string; accountNumber?: string; website?: string; phone?: string; excludeId?: string }) {
    return this.http.post<{ isDuplicate: boolean; matchId?: string; matchName?: string }>(
      `${this.baseUrl}/api/customers/check-duplicate`, params
    );
  }
}
