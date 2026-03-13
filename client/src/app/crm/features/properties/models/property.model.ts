export type PropertyStatus = 'Draft' | 'Active' | 'Conditional' | 'Sold' | 'Terminated' | 'Expired' | 'Delisted';

export type PropertyType =
  | 'Detached'
  | 'SemiDetached'
  | 'Townhouse'
  | 'Condo'
  | 'Duplex'
  | 'Triplex'
  | 'Bungalow'
  | 'Cottage'
  | 'Commercial'
  | 'Land'
  | 'MultiFamily'
  | 'Other';

export interface Property {
  id: string;
  mlsNumber?: string;
  address: string;
  city?: string;
  province?: string;
  postalCode?: string;
  listPrice?: number;
  salePrice?: number;
  currency: string;
  status: PropertyStatus;
  propertyType: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSizeSqFt?: number;
  yearBuilt?: number;
  garageSpaces?: number;
  description?: string;
  features?: string;
  neighborhood?: string;
  country?: string;
  listingDateUtc?: string;
  soldDateUtc?: string;
  ownerName?: string;
  ownerId?: string;
  accountId?: string;
  accountName?: string;
  primaryContactId?: string;
  primaryContactName?: string;
  opportunityId?: string;
  photoUrls?: string;
  virtualTourUrl?: string;
  // Commission (X7)
  commissionRate?: number;
  buyerAgentCommission?: number;
  sellerAgentCommission?: number;
  coListingAgentId?: string;
  coListingAgentName?: string;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

/** Price change history entry (X4) */
export interface PriceChange {
  id: string;
  propertyId: string;
  previousPrice: number;
  newPrice: number;
  changedAtUtc: string;
  changedBy?: string;
  reason?: string;
}

/** Showing / viewing log entry (X3) */
export interface Showing {
  id: string;
  propertyId: string;
  agentId?: string;
  agentName?: string;
  visitorName: string;
  visitorEmail?: string;
  visitorPhone?: string;
  scheduledAtUtc: string;
  durationMinutes?: number;
  feedback?: string;
  rating?: number;          // 1-5 star
  status: ShowingStatus;
  createdAtUtc: string;
}

export type ShowingStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'NoShow';

/** Property document / attachment (X1) */
export interface PropertyDocument {
  id: string;
  propertyId: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  mimeType?: string;
  category: DocumentCategory;
  uploadedBy?: string;
  uploadedAtUtc: string;
}

export type DocumentCategory = 'Photo' | 'FloorPlan' | 'Contract' | 'Inspection' | 'Appraisal' | 'Disclosure' | 'Other';

/** Activity / task linked to a property (X2) */
export interface PropertyActivity {
  id: string;
  propertyId: string;
  type: ActivityType;
  subject: string;
  description?: string;
  dueDate?: string;
  completedDate?: string;
  status: ActivityStatus;
  priority: ActivityPriority;
  assignedToId?: string;
  assignedToName?: string;
  createdByName?: string;
  createdAtUtc: string;
}

export type ActivityType = 'Task' | 'Call' | 'Email' | 'Meeting' | 'Note' | 'FollowUp';
export type ActivityStatus = 'Open' | 'InProgress' | 'Completed' | 'Cancelled';
export type ActivityPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface PropertySearchRequest {
  search?: string;
  status?: PropertyStatus;
  propertyType?: PropertyType;
  city?: string;
  accountId?: string;
  contactId?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface PropertySearchResponse {
  items: Property[];
  total: number;
}
