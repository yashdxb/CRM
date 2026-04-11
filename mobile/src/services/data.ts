import type {
  LeadListItem,
  ContactListItem,
  OpportunityListItem,
  ActivityListItem,
  PagedResult,
  DashboardSummary,
} from '../models';
import { apiFetch } from './api';

// ── Leads ───────────────────────────────────────
export function fetchLeads(
  search?: string,
  page = 1,
  pageSize = 50,
): Promise<PagedResult<LeadListItem>> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  return apiFetch(`/api/leads?${params}`);
}

// ── Contacts ────────────────────────────────────
export function fetchContacts(
  search?: string,
  page = 1,
  pageSize = 50,
): Promise<PagedResult<ContactListItem>> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  return apiFetch(`/api/contacts?${params}`);
}

// ── Opportunities (Deals) ───────────────────────
export function fetchOpportunities(
  search?: string,
  page = 1,
  pageSize = 50,
): Promise<PagedResult<OpportunityListItem>> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  return apiFetch(`/api/opportunities?${params}`);
}

// ── Activities ──────────────────────────────────
export function fetchActivities(
  search?: string,
  page = 1,
  pageSize = 50,
): Promise<PagedResult<ActivityListItem>> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  return apiFetch(`/api/activities?${params}`);
}

// ── Dashboard Summary ───────────────────────────
export function fetchDashboardSummary(): Promise<DashboardSummary> {
  return apiFetch('/api/dashboard/summary');
}
