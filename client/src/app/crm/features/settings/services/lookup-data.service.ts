import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

// ── Interfaces ──

export interface LeadStatusItem {
  id: string;
  name: string;
  order: number;
  isDefault: boolean;
  isClosed: boolean;
}

export interface OpportunityStageItem {
  id: string;
  name: string;
  order: number;
  isClosedStage: boolean;
  forecastCategory: string | null;
}

export interface CurrencyItem {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isActive: boolean;
  sortOrder: number;
}

export interface PhoneTypeItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
  isDefault: boolean;
}

export interface CadenceChannelItem {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  isDefault: boolean;
}

// ── Service ──

@Injectable({ providedIn: 'root' })
export class LookupDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // ── Lead Statuses ──

  getLeadStatuses() {
    return this.http.get<LeadStatusItem[]>(`${this.baseUrl}/api/lookups/lead-statuses`);
  }
  createLeadStatus(body: Omit<LeadStatusItem, 'id'>) {
    return this.http.post<LeadStatusItem>(`${this.baseUrl}/api/lookups/lead-statuses`, body);
  }
  updateLeadStatus(id: string, body: Omit<LeadStatusItem, 'id'>) {
    return this.http.put<LeadStatusItem>(`${this.baseUrl}/api/lookups/lead-statuses/${id}`, body);
  }
  deleteLeadStatus(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/lead-statuses/${id}`);
  }
  reorderLeadStatuses(orderedIds: string[]) {
    return this.http.post<void>(`${this.baseUrl}/api/lookups/lead-statuses/reorder`, { orderedIds });
  }

  // ── Opportunity Stages ──

  getOpportunityStages() {
    return this.http.get<OpportunityStageItem[]>(`${this.baseUrl}/api/lookups/opportunity-stages`);
  }
  createOpportunityStage(body: Omit<OpportunityStageItem, 'id'>) {
    return this.http.post<OpportunityStageItem>(`${this.baseUrl}/api/lookups/opportunity-stages`, body);
  }
  updateOpportunityStage(id: string, body: Omit<OpportunityStageItem, 'id'>) {
    return this.http.put<OpportunityStageItem>(`${this.baseUrl}/api/lookups/opportunity-stages/${id}`, body);
  }
  deleteOpportunityStage(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/opportunity-stages/${id}`);
  }
  reorderOpportunityStages(orderedIds: string[]) {
    return this.http.post<void>(`${this.baseUrl}/api/lookups/opportunity-stages/reorder`, { orderedIds });
  }

  // ── Currencies ──

  getCurrencies(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<CurrencyItem[]>(`${this.baseUrl}/api/lookups/currencies`, { params });
  }
  createCurrency(body: Omit<CurrencyItem, 'id'>) {
    return this.http.post<CurrencyItem>(`${this.baseUrl}/api/lookups/currencies`, body);
  }
  updateCurrency(id: string, body: Omit<CurrencyItem, 'id'>) {
    return this.http.put<CurrencyItem>(`${this.baseUrl}/api/lookups/currencies/${id}`, body);
  }
  deleteCurrency(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/currencies/${id}`);
  }

  // ── Phone Types ──

  getPhoneTypes(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<PhoneTypeItem[]>(`${this.baseUrl}/api/lookups/phone-types`, { params });
  }
  createPhoneType(body: Omit<PhoneTypeItem, 'id'>) {
    return this.http.post<PhoneTypeItem>(`${this.baseUrl}/api/lookups/phone-types`, body);
  }
  updatePhoneType(id: string, body: Omit<PhoneTypeItem, 'id'>) {
    return this.http.put<PhoneTypeItem>(`${this.baseUrl}/api/lookups/phone-types/${id}`, body);
  }
  deletePhoneType(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/phone-types/${id}`);
  }

  // ── Cadence Channels ──

  getCadenceChannels(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<CadenceChannelItem[]>(`${this.baseUrl}/api/lookups/cadence-channels`, { params });
  }
  createCadenceChannel(body: Omit<CadenceChannelItem, 'id'>) {
    return this.http.post<CadenceChannelItem>(`${this.baseUrl}/api/lookups/cadence-channels`, body);
  }
  updateCadenceChannel(id: string, body: Omit<CadenceChannelItem, 'id'>) {
    return this.http.put<CadenceChannelItem>(`${this.baseUrl}/api/lookups/cadence-channels/${id}`, body);
  }
  deleteCadenceChannel(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/cadence-channels/${id}`);
  }
  reorderCadenceChannels(orderedIds: string[]) {
    return this.http.post<void>(`${this.baseUrl}/api/lookups/cadence-channels/reorder`, { orderedIds });
  }
}
