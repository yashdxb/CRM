import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export interface CurrencyReference {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isActive: boolean;
}

export interface PhoneTypeReference {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
  isDefault: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReferenceDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly currencies: CurrencyReference[] = [
    { id: 'cur-USD', code: 'USD', name: 'US Dollar', symbol: '$', isActive: true },
    { id: 'cur-EUR', code: 'EUR', name: 'Euro', symbol: '€', isActive: true },
    { id: 'cur-GBP', code: 'GBP', name: 'British Pound', symbol: '£', isActive: true },
    { id: 'cur-CAD', code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', isActive: true },
    { id: 'cur-JPY', code: 'JPY', name: 'Japanese Yen', symbol: '¥', isActive: true },
    { id: 'cur-AUD', code: 'AUD', name: 'Australian Dollar', symbol: 'A$', isActive: true },
    { id: 'cur-CHF', code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', isActive: true }
  ];

  getCurrencies(): Observable<CurrencyReference[]> {
    return this.http.get<CurrencyReference[]>(`${this.baseUrl}/api/system/currencies`).pipe(
      catchError(() => of(this.currencies.slice()))
    );
  }

  getPhoneTypes(): Observable<PhoneTypeReference[]> {
    return this.http.get<PhoneTypeReference[]>(`${this.baseUrl}/api/system/phone-types`).pipe(
      catchError(() => of([]))
    );
  }

}
