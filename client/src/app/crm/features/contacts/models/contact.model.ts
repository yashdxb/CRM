export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  buyingRole?: string;
  accountId?: string;
  accountName?: string;
  ownerId?: string;
  owner?: string;
  lifecycleStage?: string;
  activityScore?: number;
  createdAt?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  tags?: string[];
  reportsToId?: string;
  reportsToName?: string;
}

export interface ContactSearchRequest {
  search?: string;
  accountId?: string;
  tag?: string;
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
  buyingRole?: string;
  accountId?: string;
  ownerId?: string;
  lifecycleStage?: string;
  activityScore?: number;
  linkedInProfile?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  tags?: string[];
  reportsToId?: string;
}

// C15: Duplicate detection
export interface DuplicateCheckRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  excludeContactId?: string;
}

export interface DuplicateContact {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  matchScore: number;
  matchReason: string;
}

export interface DuplicateCheckResponse {
  duplicates: DuplicateContact[];
}

// C16: Contact merge
export interface MergeContactsRequest {
  masterContactId: string;
  secondaryContactIds: string[];
}

export interface MergeContactsResponse {
  masterId: string;
  mergedCount: number;
}

// C19: Relationships
export interface ContactRelationship {
  id: string;
  fullName: string;
  jobTitle?: string;
  relationship: string;
}
