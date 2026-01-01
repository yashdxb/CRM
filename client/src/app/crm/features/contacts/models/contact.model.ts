export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  accountId?: string;
  accountName?: string;
  ownerId?: string;
  owner?: string;
  lifecycleStage?: string;
  activityScore?: number;
  createdAt?: string;
}

export interface ContactSearchRequest {
  search?: string;
  accountId?: string;
  page?: number;
  pageSize?: number;
}

export interface ContactSearchResponse {
  items: Contact[];
  total: number;
}

export interface SaveContactRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  accountId?: string;
  ownerId?: string;
  lifecycleStage?: string;
  activityScore?: number;
  linkedInProfile?: string;
}
