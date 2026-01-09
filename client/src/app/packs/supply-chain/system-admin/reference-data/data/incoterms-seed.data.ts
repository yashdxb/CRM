// src/app/features/reference-data/incoterms/data/incoterms-seed.data.ts

import { Incoterm, IncotermCategory } from '../data/incoterm.model';

export const INCOTERMS_SEED_DATA: Omit<Incoterm, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Any Mode of Transport
  {
    code: 'EXW',
    name: 'Ex Works',
    category: IncotermCategory.AnyMode,
    description: 'Seller makes goods available at their premises',
    sellerResponsibility: 'Make goods available at named place (factory, warehouse)',
    buyerResponsibility: 'All costs and risks from seller\'s premises',
    riskTransferPoint: 'When goods are placed at buyer\'s disposal at named place',
    isActive: true,
    displayOrder: 1
  },
  {
    code: 'FCA',
    name: 'Free Carrier',
    category: IncotermCategory.AnyMode,
    description: 'Seller delivers goods to carrier nominated by buyer',
    sellerResponsibility: 'Deliver goods to carrier at named place, export clearance',
    buyerResponsibility: 'Freight, insurance, import clearance, onward transport',
    riskTransferPoint: 'When goods are handed over to first carrier',
    isActive: true,
    displayOrder: 2
  },
  {
    code: 'CPT',
    name: 'Carriage Paid To',
    category: IncotermCategory.AnyMode,
    description: 'Seller pays freight to named destination',
    sellerResponsibility: 'Freight to destination, export clearance',
    buyerResponsibility: 'Insurance, import clearance, unloading',
    riskTransferPoint: 'When goods are handed over to first carrier',
    isActive: true,
    displayOrder: 3
  },
  {
    code: 'CIP',
    name: 'Carriage and Insurance Paid To',
    category: IncotermCategory.AnyMode,
    description: 'Seller pays freight and insurance to named destination',
    sellerResponsibility: 'Freight and insurance to destination, export clearance',
    buyerResponsibility: 'Import clearance, unloading',
    riskTransferPoint: 'When goods are handed over to first carrier',
    isActive: true,
    displayOrder: 4
  },
  {
    code: 'DAP',
    name: 'Delivered At Place',
    category: IncotermCategory.AnyMode,
    description: 'Seller delivers when goods are placed at buyer\'s disposal at named destination',
    sellerResponsibility: 'All costs and risks to named destination, export clearance',
    buyerResponsibility: 'Unloading, import clearance',
    riskTransferPoint: 'When goods are ready for unloading at named destination',
    isActive: true,
    displayOrder: 5
  },
  {
    code: 'DPU',
    name: 'Delivered at Place Unloaded',
    category: IncotermCategory.AnyMode,
    description: 'Seller delivers when goods are unloaded at named destination',
    sellerResponsibility: 'All costs and risks to destination including unloading, export clearance',
    buyerResponsibility: 'Import clearance',
    riskTransferPoint: 'When goods are unloaded at named destination',
    isActive: true,
    displayOrder: 6
  },
  {
    code: 'DDP',
    name: 'Delivered Duty Paid',
    category: IncotermCategory.AnyMode,
    description: 'Seller delivers goods cleared for import at named destination',
    sellerResponsibility: 'All costs and risks including import duties, export and import clearance',
    buyerResponsibility: 'Unloading at final destination',
    riskTransferPoint: 'When goods are ready for unloading at named destination',
    isActive: true,
    displayOrder: 7
  },

  // Sea and Inland Waterway Transport Only
  {
    code: 'FAS',
    name: 'Free Alongside Ship',
    category: IncotermCategory.SeaInland,
    description: 'Seller delivers when goods are placed alongside vessel at named port',
    sellerResponsibility: 'Deliver goods alongside ship, export clearance',
    buyerResponsibility: 'Loading, freight, insurance, import clearance',
    riskTransferPoint: 'When goods are placed alongside the vessel',
    isActive: true,
    displayOrder: 8
  },
  {
    code: 'FOB',
    name: 'Free On Board',
    category: IncotermCategory.SeaInland,
    description: 'Seller delivers goods on board vessel nominated by buyer',
    sellerResponsibility: 'Load goods on vessel, export clearance',
    buyerResponsibility: 'Freight, insurance, import clearance',
    riskTransferPoint: 'When goods pass ship\'s rail at port of shipment',
    isActive: true,
    displayOrder: 9
  },
  {
    code: 'CFR',
    name: 'Cost and Freight',
    category: IncotermCategory.SeaInland,
    description: 'Seller pays freight to destination port',
    sellerResponsibility: 'Freight to destination port, loading, export clearance',
    buyerResponsibility: 'Insurance, import clearance, unloading',
    riskTransferPoint: 'When goods pass ship\'s rail at port of shipment',
    isActive: true,
    displayOrder: 10
  },
  {
    code: 'CIF',
    name: 'Cost, Insurance and Freight',
    category: IncotermCategory.SeaInland,
    description: 'Seller pays freight and insurance to destination port',
    sellerResponsibility: 'Freight and insurance to destination port, loading, export clearance',
    buyerResponsibility: 'Import clearance, unloading',
    riskTransferPoint: 'When goods pass ship\'s rail at port of shipment',
    isActive: true,
    displayOrder: 11
  }
];

export const INCOTERM_CATEGORIES = [
  IncotermCategory.AnyMode,
  IncotermCategory.SeaInland
];