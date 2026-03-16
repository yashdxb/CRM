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

export interface AccountTypeItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface AccountSourceItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface CustomerRatingItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ContactBuyingRoleItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ActivityTypeItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ActivityPriorityItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HelpdeskCaseStatusItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HelpdeskPriorityItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HelpdeskSeverityItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HelpdeskSourceItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface PropertyStatusItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface PropertyTypeItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface DealTypeItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface DealSegmentItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface DocumentCategoryItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface LeadDisqualificationReasonItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface LeadLossReasonItem {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
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

  // ── Account Types ──

  getAccountTypes(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<AccountTypeItem[]>(`${this.baseUrl}/api/lookups/account-types`, { params });
  }
  createAccountType(body: Omit<AccountTypeItem, 'id'>) {
    return this.http.post<AccountTypeItem>(`${this.baseUrl}/api/lookups/account-types`, body);
  }
  updateAccountType(id: string, body: Omit<AccountTypeItem, 'id'>) {
    return this.http.put<AccountTypeItem>(`${this.baseUrl}/api/lookups/account-types/${id}`, body);
  }
  deleteAccountType(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/account-types/${id}`);
  }

  // ── Account Sources ──

  getAccountSources(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<AccountSourceItem[]>(`${this.baseUrl}/api/lookups/account-sources`, { params });
  }
  createAccountSource(body: Omit<AccountSourceItem, 'id'>) {
    return this.http.post<AccountSourceItem>(`${this.baseUrl}/api/lookups/account-sources`, body);
  }
  updateAccountSource(id: string, body: Omit<AccountSourceItem, 'id'>) {
    return this.http.put<AccountSourceItem>(`${this.baseUrl}/api/lookups/account-sources/${id}`, body);
  }
  deleteAccountSource(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/account-sources/${id}`);
  }

  // ── Customer Ratings ──

  getCustomerRatings(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<CustomerRatingItem[]>(`${this.baseUrl}/api/lookups/customer-ratings`, { params });
  }
  createCustomerRating(body: Omit<CustomerRatingItem, 'id'>) {
    return this.http.post<CustomerRatingItem>(`${this.baseUrl}/api/lookups/customer-ratings`, body);
  }
  updateCustomerRating(id: string, body: Omit<CustomerRatingItem, 'id'>) {
    return this.http.put<CustomerRatingItem>(`${this.baseUrl}/api/lookups/customer-ratings/${id}`, body);
  }
  deleteCustomerRating(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/customer-ratings/${id}`);
  }

  // ── Contact Buying Roles ──

  getContactBuyingRoles(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<ContactBuyingRoleItem[]>(`${this.baseUrl}/api/lookups/contact-buying-roles`, { params });
  }
  createContactBuyingRole(body: Omit<ContactBuyingRoleItem, 'id'>) {
    return this.http.post<ContactBuyingRoleItem>(`${this.baseUrl}/api/lookups/contact-buying-roles`, body);
  }
  updateContactBuyingRole(id: string, body: Omit<ContactBuyingRoleItem, 'id'>) {
    return this.http.put<ContactBuyingRoleItem>(`${this.baseUrl}/api/lookups/contact-buying-roles/${id}`, body);
  }
  deleteContactBuyingRole(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/contact-buying-roles/${id}`);
  }

  // ── Activity Types ──

  getActivityTypes(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<ActivityTypeItem[]>(`${this.baseUrl}/api/lookups/activity-types`, { params });
  }
  createActivityType(body: Omit<ActivityTypeItem, 'id'>) {
    return this.http.post<ActivityTypeItem>(`${this.baseUrl}/api/lookups/activity-types`, body);
  }
  updateActivityType(id: string, body: Omit<ActivityTypeItem, 'id'>) {
    return this.http.put<ActivityTypeItem>(`${this.baseUrl}/api/lookups/activity-types/${id}`, body);
  }
  deleteActivityType(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/activity-types/${id}`);
  }

  // ── Activity Priorities ──

  getActivityPriorities(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<ActivityPriorityItem[]>(`${this.baseUrl}/api/lookups/activity-priorities`, { params });
  }
  createActivityPriority(body: Omit<ActivityPriorityItem, 'id'>) {
    return this.http.post<ActivityPriorityItem>(`${this.baseUrl}/api/lookups/activity-priorities`, body);
  }
  updateActivityPriority(id: string, body: Omit<ActivityPriorityItem, 'id'>) {
    return this.http.put<ActivityPriorityItem>(`${this.baseUrl}/api/lookups/activity-priorities/${id}`, body);
  }
  deleteActivityPriority(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/activity-priorities/${id}`);
  }

  // ── Helpdesk Case Statuses ──

  getHelpdeskCaseStatuses(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<HelpdeskCaseStatusItem[]>(`${this.baseUrl}/api/lookups/helpdesk-case-statuses`, { params });
  }
  createHelpdeskCaseStatus(body: Omit<HelpdeskCaseStatusItem, 'id'>) {
    return this.http.post<HelpdeskCaseStatusItem>(`${this.baseUrl}/api/lookups/helpdesk-case-statuses`, body);
  }
  updateHelpdeskCaseStatus(id: string, body: Omit<HelpdeskCaseStatusItem, 'id'>) {
    return this.http.put<HelpdeskCaseStatusItem>(`${this.baseUrl}/api/lookups/helpdesk-case-statuses/${id}`, body);
  }
  deleteHelpdeskCaseStatus(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/helpdesk-case-statuses/${id}`);
  }

  // ── Helpdesk Priorities ──

  getHelpdeskPriorities(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<HelpdeskPriorityItem[]>(`${this.baseUrl}/api/lookups/helpdesk-priorities`, { params });
  }
  createHelpdeskPriority(body: Omit<HelpdeskPriorityItem, 'id'>) {
    return this.http.post<HelpdeskPriorityItem>(`${this.baseUrl}/api/lookups/helpdesk-priorities`, body);
  }
  updateHelpdeskPriority(id: string, body: Omit<HelpdeskPriorityItem, 'id'>) {
    return this.http.put<HelpdeskPriorityItem>(`${this.baseUrl}/api/lookups/helpdesk-priorities/${id}`, body);
  }
  deleteHelpdeskPriority(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/helpdesk-priorities/${id}`);
  }

  // ── Helpdesk Severities ──

  getHelpdeskSeverities(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<HelpdeskSeverityItem[]>(`${this.baseUrl}/api/lookups/helpdesk-severities`, { params });
  }
  createHelpdeskSeverity(body: Omit<HelpdeskSeverityItem, 'id'>) {
    return this.http.post<HelpdeskSeverityItem>(`${this.baseUrl}/api/lookups/helpdesk-severities`, body);
  }
  updateHelpdeskSeverity(id: string, body: Omit<HelpdeskSeverityItem, 'id'>) {
    return this.http.put<HelpdeskSeverityItem>(`${this.baseUrl}/api/lookups/helpdesk-severities/${id}`, body);
  }
  deleteHelpdeskSeverity(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/helpdesk-severities/${id}`);
  }

  // ── Helpdesk Sources ──

  getHelpdeskSources(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<HelpdeskSourceItem[]>(`${this.baseUrl}/api/lookups/helpdesk-sources`, { params });
  }
  createHelpdeskSource(body: Omit<HelpdeskSourceItem, 'id'>) {
    return this.http.post<HelpdeskSourceItem>(`${this.baseUrl}/api/lookups/helpdesk-sources`, body);
  }
  updateHelpdeskSource(id: string, body: Omit<HelpdeskSourceItem, 'id'>) {
    return this.http.put<HelpdeskSourceItem>(`${this.baseUrl}/api/lookups/helpdesk-sources/${id}`, body);
  }
  deleteHelpdeskSource(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/helpdesk-sources/${id}`);
  }

  // ── Property Statuses ──

  getPropertyStatuses(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<PropertyStatusItem[]>(`${this.baseUrl}/api/lookups/property-statuses`, { params });
  }
  createPropertyStatus(body: Omit<PropertyStatusItem, 'id'>) {
    return this.http.post<PropertyStatusItem>(`${this.baseUrl}/api/lookups/property-statuses`, body);
  }
  updatePropertyStatus(id: string, body: Omit<PropertyStatusItem, 'id'>) {
    return this.http.put<PropertyStatusItem>(`${this.baseUrl}/api/lookups/property-statuses/${id}`, body);
  }
  deletePropertyStatus(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/property-statuses/${id}`);
  }

  // ── Property Types ──

  getPropertyTypes(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<PropertyTypeItem[]>(`${this.baseUrl}/api/lookups/property-types`, { params });
  }
  createPropertyType(body: Omit<PropertyTypeItem, 'id'>) {
    return this.http.post<PropertyTypeItem>(`${this.baseUrl}/api/lookups/property-types`, body);
  }
  updatePropertyType(id: string, body: Omit<PropertyTypeItem, 'id'>) {
    return this.http.put<PropertyTypeItem>(`${this.baseUrl}/api/lookups/property-types/${id}`, body);
  }
  deletePropertyType(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/property-types/${id}`);
  }

  // ── Deal Types ──

  getDealTypes(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<DealTypeItem[]>(`${this.baseUrl}/api/lookups/deal-types`, { params });
  }
  createDealType(body: Omit<DealTypeItem, 'id'>) {
    return this.http.post<DealTypeItem>(`${this.baseUrl}/api/lookups/deal-types`, body);
  }
  updateDealType(id: string, body: Omit<DealTypeItem, 'id'>) {
    return this.http.put<DealTypeItem>(`${this.baseUrl}/api/lookups/deal-types/${id}`, body);
  }
  deleteDealType(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/deal-types/${id}`);
  }

  // ── Deal Segments ──

  getDealSegments(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<DealSegmentItem[]>(`${this.baseUrl}/api/lookups/deal-segments`, { params });
  }
  createDealSegment(body: Omit<DealSegmentItem, 'id'>) {
    return this.http.post<DealSegmentItem>(`${this.baseUrl}/api/lookups/deal-segments`, body);
  }
  updateDealSegment(id: string, body: Omit<DealSegmentItem, 'id'>) {
    return this.http.put<DealSegmentItem>(`${this.baseUrl}/api/lookups/deal-segments/${id}`, body);
  }
  deleteDealSegment(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/deal-segments/${id}`);
  }

  // ── Document Categories ──

  getDocumentCategories(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<DocumentCategoryItem[]>(`${this.baseUrl}/api/lookups/document-categories`, { params });
  }
  createDocumentCategory(body: Omit<DocumentCategoryItem, 'id'>) {
    return this.http.post<DocumentCategoryItem>(`${this.baseUrl}/api/lookups/document-categories`, body);
  }
  updateDocumentCategory(id: string, body: Omit<DocumentCategoryItem, 'id'>) {
    return this.http.put<DocumentCategoryItem>(`${this.baseUrl}/api/lookups/document-categories/${id}`, body);
  }
  deleteDocumentCategory(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/document-categories/${id}`);
  }

  // ── Lead Disqualification Reasons ──

  getLeadDisqualificationReasons(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<LeadDisqualificationReasonItem[]>(`${this.baseUrl}/api/lookups/lead-disqualification-reasons`, { params });
  }
  createLeadDisqualificationReason(body: Omit<LeadDisqualificationReasonItem, 'id'>) {
    return this.http.post<LeadDisqualificationReasonItem>(`${this.baseUrl}/api/lookups/lead-disqualification-reasons`, body);
  }
  updateLeadDisqualificationReason(id: string, body: Omit<LeadDisqualificationReasonItem, 'id'>) {
    return this.http.put<LeadDisqualificationReasonItem>(`${this.baseUrl}/api/lookups/lead-disqualification-reasons/${id}`, body);
  }
  deleteLeadDisqualificationReason(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/lead-disqualification-reasons/${id}`);
  }

  // ── Lead Loss Reasons ──

  getLeadLossReasons(includeInactive = false) {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<LeadLossReasonItem[]>(`${this.baseUrl}/api/lookups/lead-loss-reasons`, { params });
  }
  createLeadLossReason(body: Omit<LeadLossReasonItem, 'id'>) {
    return this.http.post<LeadLossReasonItem>(`${this.baseUrl}/api/lookups/lead-loss-reasons`, body);
  }
  updateLeadLossReason(id: string, body: Omit<LeadLossReasonItem, 'id'>) {
    return this.http.put<LeadLossReasonItem>(`${this.baseUrl}/api/lookups/lead-loss-reasons/${id}`, body);
  }
  deleteLeadLossReason(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/lookups/lead-loss-reasons/${id}`);
  }
}
