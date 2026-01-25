import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer, CustomerSearchRequest, CustomerSearchResponse, CustomerStatus } from '../models/customer.model';
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

    return this.http.get<CustomerSearchResponse>(`${this.baseUrl}/api/customers`, { params });
  }

  getById(id: string) {
    return this.http.get<Customer>(`${this.baseUrl}/api/customers/${id}`);
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
}
