export type CustomerStatus = 'Lead' | 'Prospect' | 'Customer';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: CustomerStatus;
  ownerId?: string;
  owner: string;
  parentAccountId?: string;
  parentAccountName?: string;
  createdAt: string;
  notes?: string[];
}

export interface CustomerSearchRequest {
  search?: string;
  status?: CustomerStatus;
  page?: number;
  pageSize?: number;
}

export interface CustomerSearchResponse {
  items: Customer[];
  total: number;
}
