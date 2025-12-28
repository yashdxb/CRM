import { Injectable, signal } from '@angular/core';
import { readUserId } from '../../core/auth/token.utils';

export type RecentlyViewedType = 'customers' | 'contacts' | 'leads' | 'opportunities' | 'activities';

export interface RecentlyViewedItem {
  id: string;
  title: string;
  subtitle?: string;
  viewedAt: string;
}

type RecentlyViewedStore = Record<RecentlyViewedType, RecentlyViewedItem[]>;

const STORAGE_PREFIX = 'recently_viewed';
const MAX_ITEMS = 8;

@Injectable({ providedIn: 'root' })
export class RecentlyViewedService {
  private readonly store = signal<RecentlyViewedStore>(this.readStore());

  itemsFor(type: RecentlyViewedType): RecentlyViewedItem[] {
    return this.store()[type];
  }

  add(type: RecentlyViewedType, item: Omit<RecentlyViewedItem, 'viewedAt'>) {
    const current = this.store();
    const normalized: RecentlyViewedItem = { ...item, viewedAt: new Date().toISOString() };
    const nextList = [normalized, ...current[type].filter((entry) => entry.id !== item.id)].slice(0, MAX_ITEMS);
    const nextStore = { ...current, [type]: nextList };
    this.store.set(nextStore);
    this.writeStore(nextStore);
  }

  private readStore(): RecentlyViewedStore {
    const raw = this.safeRead();
    return {
      customers: raw?.customers ?? [],
      contacts: raw?.contacts ?? [],
      leads: raw?.leads ?? [],
      opportunities: raw?.opportunities ?? [],
      activities: raw?.activities ?? []
    };
  }

  private safeRead(): Partial<RecentlyViewedStore> | null {
    try {
      const key = this.storageKey();
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private writeStore(store: RecentlyViewedStore) {
    try {
      localStorage.setItem(this.storageKey(), JSON.stringify(store));
    } catch {
      // Ignore storage errors
    }
  }

  private storageKey() {
    const userId = readUserId() ?? 'anonymous';
    return `${STORAGE_PREFIX}:${userId}`;
  }
}
