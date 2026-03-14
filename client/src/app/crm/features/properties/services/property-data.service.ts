import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Property, PriceChange, PropertyActivity, PropertySearchRequest, PropertySearchResponse,
  Showing, PropertyDocument, MlsFeedConfig, MlsImportJob, CmaReport,
  PropertyTimelineEvent,
  SignatureRequest, PropertyAlertRule, PropertyAlertNotification
} from '../models/property.model';
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

  getTimeline(propertyId: string) {
    return this.http.get<PropertyTimelineEvent[]>(`${this.baseUrl}/api/properties/${propertyId}/timeline`);
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

  uploadPhoto(propertyId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<PropertyDocument>(`${this.baseUrl}/api/properties/${propertyId}/photos`, formData);
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

  // MLS/IDX Feeds (G1)
  getMlsFeeds() {
    return this.http.get<MlsFeedConfig[]>(`${this.baseUrl}/api/properties/mls-feeds`);
  }

  createMlsFeed(payload: Partial<MlsFeedConfig>) {
    return this.http.post<MlsFeedConfig>(`${this.baseUrl}/api/properties/mls-feeds`, payload);
  }

  triggerMlsImport(feedId: string) {
    return this.http.post<MlsImportJob>(`${this.baseUrl}/api/properties/mls-feeds/${feedId}/import`, {});
  }

  getMlsImportHistory() {
    return this.http.get<MlsImportJob[]>(`${this.baseUrl}/api/properties/mls-imports`);
  }

  // Comparable Market Analysis (G3)
  getCmaReport(propertyId: string) {
    return this.http.get<CmaReport>(`${this.baseUrl}/api/properties/${propertyId}/cma`);
  }

  generateCmaReport(propertyId: string, radiusMiles: number = 2) {
    return this.http.post<CmaReport>(`${this.baseUrl}/api/properties/${propertyId}/cma`, { radiusMiles });
  }

  // E-Signature (G4)
  getSignatureRequests(propertyId: string) {
    return this.http.get<SignatureRequest[]>(`${this.baseUrl}/api/properties/${propertyId}/signatures`);
  }

  createSignatureRequest(propertyId: string, payload: Partial<SignatureRequest>) {
    return this.http.post<SignatureRequest>(`${this.baseUrl}/api/properties/${propertyId}/signatures`, payload);
  }

  sendSignatureRequest(propertyId: string, signatureId: string) {
    return this.http.post<SignatureRequest>(`${this.baseUrl}/api/properties/${propertyId}/signatures/${signatureId}/send`, {});
  }

  refreshSignatureStatus(propertyId: string, signatureId: string) {
    return this.http.post<SignatureRequest>(`${this.baseUrl}/api/properties/${propertyId}/signatures/${signatureId}/refresh`, {});
  }

  voidSignatureRequest(propertyId: string, signatureId: string, reason: string) {
    return this.http.post<void>(`${this.baseUrl}/api/properties/${propertyId}/signatures/${signatureId}/void`, { reason });
  }

  downloadSignedDocument(propertyId: string, signatureId: string) {
    return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/signatures/${signatureId}/download`, {
      responseType: 'blob'
    });
  }

  // Property Alerts (G5)
  getAlertRules(propertyId: string) {
    return this.http.get<PropertyAlertRule[]>(`${this.baseUrl}/api/properties/${propertyId}/alerts`);
  }

  createAlertRule(propertyId: string, payload: Partial<PropertyAlertRule>) {
    return this.http.post<PropertyAlertRule>(`${this.baseUrl}/api/properties/${propertyId}/alerts`, payload);
  }

  toggleAlertRule(propertyId: string, ruleId: string, isActive: boolean) {
    return this.http.put<PropertyAlertRule>(`${this.baseUrl}/api/properties/${propertyId}/alerts/${ruleId}`, { isActive });
  }

  getAlertNotifications(propertyId: string) {
    return this.http.get<PropertyAlertNotification[]>(`${this.baseUrl}/api/properties/${propertyId}/alert-notifications`);
  }
}
