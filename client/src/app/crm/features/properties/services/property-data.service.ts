import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Property, PropertySearchRequest, PropertySearchResponse } from '../models/property.model';
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
}
