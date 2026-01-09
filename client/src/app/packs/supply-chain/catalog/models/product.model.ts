// src/app/features/products/models/product.model.ts

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  supplierId: string;
  supplierName: string;
  categoryId: string;
  categoryName: string;
  defaultUOM: UnitOfMeasure;
  predictedDemand30Days: number;
  optimalStockLevel: number;
  currentStockLevel?: number;
  seasonalityIndex: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentCategoryId?: string;
  level: number;
  isActive: boolean;
}

export enum UnitOfMeasure {
  PIECE = 'Piece',
  KILOGRAM = 'Kilogram',
  LITER = 'Liter',
  METER = 'Meter',
  BOX = 'Box',
  PALLET = 'Pallet',
  CARTON = 'Carton',
  DOZEN = 'Dozen'
}

export enum ProductStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DISCONTINUED = 'Discontinued',
  OUT_OF_STOCK = 'Out of Stock'
}

export enum DemandLevel {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface ProductListParams {
  page: number;
  pageSize: number;
  search?: string;
  categoryId?: string;
  status?: ProductStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductListResponse {
  items: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CatalogSupplier {
  id: string;
  name: string;
}
