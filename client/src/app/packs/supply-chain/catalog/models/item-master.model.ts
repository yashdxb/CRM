export interface ItemMaster {
  id: string;
  sku: string;
  name: string;
  description?: string | null;
  categoryName?: string | null;
  defaultUom?: string | null;
  isActive: boolean;
}
