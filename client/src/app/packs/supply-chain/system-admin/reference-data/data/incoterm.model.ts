// src/app/features/reference-data/incoterms/models/incoterm.model.ts

export enum IncotermCategory {
  AnyMode = 'Any Mode of Transport',
  SeaInland = 'Sea and Inland Waterway'
}

export interface Incoterm {
  id: string;
  code: string;                  // EXW, FOB, CIF, DDP, etc.
  name: string;                  // Ex Works, Free On Board, etc.
  category: IncotermCategory;
  description?: string;
  sellerResponsibility?: string; // What seller is responsible for
  buyerResponsibility?: string;  // What buyer is responsible for
  riskTransferPoint?: string;    // When risk transfers from seller to buyer
  isActive: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IncotermFilter {
  searchText?: string;
  category?: IncotermCategory | null;
  isActive?: boolean | null;
}