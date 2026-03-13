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

// ── MLS/IDX Feed Integration (G1) ──

export type MlsFeedProvider = 'CREA' | 'RETS' | 'RESO' | 'IDX' | 'Custom';
export type MlsFeedStatus = 'Active' | 'Paused' | 'Error';
export type MlsImportJobStatus = 'Running' | 'Completed' | 'Failed';

export interface MlsFeedConfig {
  id: string;
  feedName: string;
  feedUrl: string;
  provider: MlsFeedProvider;
  autoSync: boolean;
  syncIntervalMinutes: number;
  lastSyncAtUtc?: string;
  status: MlsFeedStatus;
  totalImported: number;
  createdAtUtc: string;
}

export interface MlsImportJob {
  id: string;
  feedId: string;
  feedName: string;
  startedAtUtc: string;
  completedAtUtc?: string;
  status: MlsImportJobStatus;
  totalRecords: number;
  imported: number;
  updated: number;
  skipped: number;
  errors: number;
}

// ── Comparable Market Analysis (G3) ──

export type CmaPropertyStatus = 'Active' | 'Sold' | 'Pending';
export type CmaSource = 'MLS' | 'Internal' | 'Public';
export type MarketTrend = 'Rising' | 'Stable' | 'Declining';

export interface ComparableProperty {
  id: string;
  address: string;
  city?: string;
  neighborhood?: string;
  propertyType: PropertyType;
  listPrice: number;
  salePrice?: number;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  status: CmaPropertyStatus;
  soldDateUtc?: string;
  daysOnMarket: number;
  pricePerSqFt?: number;
  distanceMiles: number;
  source: CmaSource;
}

export interface CmaSummary {
  avgListPrice: number;
  avgSalePrice: number;
  avgPricePerSqFt: number;
  avgDaysOnMarket: number;
  medianPrice: number;
  priceRangeLow: number;
  priceRangeHigh: number;
  suggestedPrice: number;
  marketTrend: MarketTrend;
}

export interface CmaReport {
  propertyId: string;
  generatedAtUtc: string;
  comparables: ComparableProperty[];
  summary: CmaSummary;
}

// ── E-Signature Integration (G4) ──

export type SignatureProvider = 'DocuSign' | 'HelloSign' | 'AdobeSign';
export type SignatureDocType = 'PurchaseAgreement' | 'ListingAgreement' | 'Amendment' | 'Disclosure' | 'Other';
export type SignatureStatus = 'Draft' | 'Sent' | 'Viewed' | 'Signed' | 'Declined' | 'Expired';
export type SignerRole = 'Buyer' | 'Seller' | 'Agent' | 'Lawyer' | 'Witness';
export type SignerStatus = 'Pending' | 'Sent' | 'Viewed' | 'Signed' | 'Declined';

export interface SignatureRequestSigner {
  name: string;
  email: string;
  role: SignerRole;
  status: SignerStatus;
  signedAtUtc?: string;
}

export interface SignatureRequest {
  id: string;
  propertyId: string;
  documentName: string;
  documentType: SignatureDocType;
  provider: SignatureProvider;
  status: SignatureStatus;
  signers: SignatureRequestSigner[];
  sentAtUtc?: string;
  completedAtUtc?: string;
  expiresAtUtc?: string;
  createdByName: string;
  createdAtUtc: string;
}

// ── Automated Property Alerts (G5) ──

export type AlertFrequency = 'Instant' | 'Daily' | 'Weekly';
export type AlertNotificationStatus = 'Sent' | 'Opened' | 'Clicked' | 'Bounced';

export interface PropertyAlertRule {
  id: string;
  propertyId?: string;
  clientName: string;
  clientEmail: string;
  criteria: {
    minPrice?: number;
    maxPrice?: number;
    propertyTypes?: PropertyType[];
    minBedrooms?: number;
    cities?: string[];
    neighborhoods?: string[];
  };
  frequency: AlertFrequency;
  isActive: boolean;
  matchCount: number;
  lastNotifiedAtUtc?: string;
  createdAtUtc: string;
}

export interface PropertyAlertNotification {
  id: string;
  ruleId: string;
  clientName: string;
  clientEmail: string;
  matchedProperties: number;
  sentAtUtc: string;
  status: AlertNotificationStatus;
}
