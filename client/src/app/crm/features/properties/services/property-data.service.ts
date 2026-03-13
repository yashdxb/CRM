import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Property, PriceChange, PropertyActivity, PropertySearchRequest, PropertySearchResponse, Showing, PropertyDocument } from '../models/property.model';
import { environment } from '../../../../../environments/environment';

export interface SavePropertyRequest {
  mlsNumber?: string;
  address: string;
  city?: string;
  province?: string;
  postalCode?: string;
  listPrice?: number;
  salePrice?: number;
  currency?: string;
  status?: string;
  propertyType?: string;
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
  ownerId?: string;
  accountId?: string;
  primaryContactId?: string;
  opportunityId?: string;
  photoUrls?: string;
  virtualTourUrl?: string;
  // Commission (X7)
  commissionRate?: number;
  buyerAgentCommission?: number;
  sellerAgentCommission?: number;
  coListingAgentId?: string;
}

@Injectable({ providedIn: 'root' })
export class PropertyDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  search(request: PropertySearchRequest) {
    let params = new HttpParams();
    if (request.search) params = params.set('search', request.search);
    if (request.status) params = params.set('status', request.status);
    if (request.propertyType) params = params.set('propertyType', request.propertyType);
    if (request.city) params = params.set('city', request.city);
    if (request.accountId) params = params.set('accountId', request.accountId);
    if (request.contactId) params = params.set('contactId', request.contactId);
    if (request.sortBy) params = params.set('sortBy', request.sortBy);
    if (request.page) params = params.set('page', request.page);
    if (request.pageSize) params = params.set('pageSize', request.pageSize);
    return this.http.get<PropertySearchResponse>(`${this.baseUrl}/api/properties`, { params });
  }

  getById(id: string) {
    return this.http.get<Property>(`${this.baseUrl}/api/properties/${id}`);
  }

  create(payload: SavePropertyRequest) {
    return this.http.post<Property>(`${this.baseUrl}/api/properties`, payload);
  }

  update(id: string, payload: SavePropertyRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/properties/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/properties/${id}`);
  }

  // Price History (X4)
  getPriceHistory(propertyId: string) {
    return this.http.get<PriceChange[]>(`${this.baseUrl}/api/properties/${propertyId}/price-history`);
  }

  addPriceChange(propertyId: string, payload: { previousPrice: number; newPrice: number; changedBy?: string; reason?: string }) {
    return this.http.post<PriceChange>(`${this.baseUrl}/api/properties/${propertyId}/price-history`, payload);
  }

  // Showings (X3)
  getShowings(propertyId: string) {
    return this.http.get<Showing[]>(`${this.baseUrl}/api/properties/${propertyId}/showings`);
  }

  createShowing(propertyId: string, payload: Partial<Showing>) {
    return this.http.post<Showing>(`${this.baseUrl}/api/properties/${propertyId}/showings`, payload);
  }

  updateShowing(propertyId: string, showingId: string, payload: Partial<Showing>) {
    return this.http.put<Showing>(`${this.baseUrl}/api/properties/${propertyId}/showings/${showingId}`, payload);
  }

  // Documents (X1)
  getDocuments(propertyId: string) {
    return this.http.get<PropertyDocument[]>(`${this.baseUrl}/api/properties/${propertyId}/documents`);
  }

  uploadDocument(propertyId: string, payload: Partial<PropertyDocument>) {
    return this.http.post<PropertyDocument>(`${this.baseUrl}/api/properties/${propertyId}/documents`, payload);
  }

  deleteDocument(propertyId: string, docId: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/properties/${propertyId}/documents/${docId}`);
  }

  // Activities (X2)
  getActivities(propertyId: string) {
    return this.http.get<PropertyActivity[]>(`${this.baseUrl}/api/properties/${propertyId}/activities`);
  }

  createActivity(propertyId: string, payload: Partial<PropertyActivity>) {
    return this.http.post<PropertyActivity>(`${this.baseUrl}/api/properties/${propertyId}/activities`, payload);
  }

  updateActivity(propertyId: string, activityId: string, payload: Partial<PropertyActivity>) {
    return this.http.put<PropertyActivity>(`${this.baseUrl}/api/properties/${propertyId}/activities/${activityId}`, payload);
  }
}
