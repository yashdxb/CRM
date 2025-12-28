import { Injectable } from '@angular/core';
import { readUserId } from '../../core/auth/token.utils';

export interface SavedView<TFilters> {
  id: string;
  name: string;
  filters: TFilters;
  updatedAtUtc: string;
}

@Injectable({ providedIn: 'root' })
export class SavedViewsService {
  getViews<TFilters>(moduleKey: string): SavedView<TFilters>[] {
    const raw = localStorage.getItem(this.buildKey(moduleKey));
    if (!raw) {
      return [];
    }
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveView<TFilters>(
    moduleKey: string,
    view: Omit<SavedView<TFilters>, 'id' | 'updatedAtUtc'> & { id?: string }
  ): SavedView<TFilters> {
    const views = this.getViews<TFilters>(moduleKey);
    const id = view.id ?? this.createId();
    const next: SavedView<TFilters> = {
      id,
      name: view.name,
      filters: view.filters,
      updatedAtUtc: new Date().toISOString()
    };
    const updated = views.some((item) => item.id === id)
      ? views.map((item) => (item.id === id ? next : item))
      : [next, ...views];
    localStorage.setItem(this.buildKey(moduleKey), JSON.stringify(updated));
    return next;
  }

  deleteView(moduleKey: string, id: string) {
    const views = this.getViews(moduleKey).filter((item) => item.id !== id);
    localStorage.setItem(this.buildKey(moduleKey), JSON.stringify(views));
  }

  private buildKey(moduleKey: string) {
    const userId = readUserId() ?? 'anonymous';
    return `saved_views:${userId}:${moduleKey}`;
  }

  private createId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
