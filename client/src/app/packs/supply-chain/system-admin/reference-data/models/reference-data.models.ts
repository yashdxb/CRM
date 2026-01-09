// src/app/core/models/reference-data.models.ts

export interface UnitOfMeasure {
  id: string;
  code: string;
  name: string;
  symbol: string;
  abbreviation?: string;
  unitType: UnitType;
  isBaseUnit: boolean;
  conversionFactor: number;
  baseUnit?: string;
  description?: string;
  displayOrder?: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UnitType {
  LENGTH = 'Length',
  WEIGHT = 'Weight',
  VOLUME = 'Volume',
  QUANTITY = 'Quantity',
  COUNT = 'Count',
  TIME = 'Time',
  AREA = 'Area',
  TEMPERATURE = 'Temperature',
  PRESSURE = 'Pressure'
}

export interface Country {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isActive: boolean;
}

export interface CertificationType {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface PaymentTerm {
  id: string;
  code: string;
  description: string;
  days: number;
  isActive: boolean;
}

export interface Incoterm {
  id: string;
  code: string;
  description: string;
  isActive: boolean;
}