export interface ItemMaster {
  id: string;
  itemType: 'Product' | 'Service';
  sku: string;
  name: string;
  description?: string | null;
  categoryName?: string | null;
  defaultUom?: string | null;
  isActive: boolean;
  defaultUnitPrice?: number | null;
  defaultPriceListName?: string | null;
}

export interface ItemMasterSearchRequest {
  search?: string;
  itemType?: 'Product' | 'Service';
  category?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ItemMasterSearchResponse {
  items: ItemMaster[];
  total: number;
}

export interface ItemMasterUpsertRequest {
  itemType: 'Product' | 'Service';
  sku: string;
  name: string;
  description?: string | null;
  categoryName?: string | null;
  defaultUom?: string | null;
  isActive: boolean;
}
