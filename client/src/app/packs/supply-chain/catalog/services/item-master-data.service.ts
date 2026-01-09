import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ItemMaster } from '../models/item-master.model';

@Injectable({ providedIn: 'root' })
export class ItemMasterDataService {
  private readonly baseUrl = `${environment.apiUrl}/api/supply-chain/item-master`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ItemMaster[]> {
    return this.http.get<ItemMaster[]>(this.baseUrl);
  }
}
