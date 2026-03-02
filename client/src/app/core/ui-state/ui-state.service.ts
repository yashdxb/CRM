import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, tap } from 'rxjs';

interface UiStateResponse {
  key: string;
  value: unknown;
}

/**
 * Service to persist user UI state/preferences to the server.
 * Stores values in the user's UiPreferencesJson column.
 */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, unknown>();

  /**
   * Get a UI state value by key.
   * Returns null if not found.
   */
  get<T>(key: string): Observable<T | null> {
    // Check cache first
    if (this.cache.has(key)) {
      return of(this.cache.get(key) as T);
    }

    return this.http.get<UiStateResponse>(`/api/users/me/ui-state/${encodeURIComponent(key)}`).pipe(
      map(response => {
        const value = response.value as T;
        this.cache.set(key, value);
        return value;
      }),
      catchError(() => of(null))
    );
  }

  /**
   * Save a UI state value by key.
   * Returns the saved value on success.
   */
  set<T>(key: string, value: T): Observable<T | null> {
    return this.http.put<UiStateResponse>(`/api/users/me/ui-state/${encodeURIComponent(key)}`, { value }).pipe(
      tap(() => this.cache.set(key, value)),
      map(() => value),
      catchError(() => of(null))
    );
  }

  /**
   * Clear cached value for a key.
   */
  clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}
