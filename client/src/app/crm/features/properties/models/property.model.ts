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
  neighborhood?: string;
  ownerName?: string;
  ownerId?: string;
  accountId?: string;
  accountName?: string;
  primaryContactId?: string;
  primaryContactName?: string;
  opportunityId?: string;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface PropertySearchRequest {
  search?: string;
  status?: PropertyStatus;
  propertyType?: PropertyType;
  city?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface PropertySearchResponse {
  items: Property[];
  total: number;
}
