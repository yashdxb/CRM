// src/app/features/reference-data/data/uom-mock.data.ts

import { UnitOfMeasure, UnitType } from '../models/reference-data.models';

export const UOM_MOCK_DATA: UnitOfMeasure[] = [
  // ============================================
  // WEIGHT
  // ============================================
  {
    id: '1',
    code: 'KG',
    name: 'Kilogram',
    symbol: 'kg',
    unitType: UnitType.WEIGHT,
    isBaseUnit: true,
    conversionFactor: 1.0,
    description: 'Base unit for weight in metric system',
    isActive: true,
    displayOrder: 1,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    code: 'G',
    name: 'Gram',
    symbol: 'g',
    unitType: UnitType.WEIGHT,
    isBaseUnit: false,
    conversionFactor: 0.001,
    description: '1 gram = 0.001 kilograms',
    isActive: true,
    displayOrder: 2,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    code: 'MG',
    name: 'Milligram',
    symbol: 'mg',
    unitType: UnitType.WEIGHT,
    isBaseUnit: false,
    conversionFactor: 0.000001,
    description: '1 milligram = 0.000001 kilograms',
    isActive: true,
    displayOrder: 3,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '4',
    code: 'LB',
    name: 'Pound',
    symbol: 'lb',
    unitType: UnitType.WEIGHT,
    isBaseUnit: false,
    conversionFactor: 0.453592,
    description: '1 pound = 0.453592 kilograms',
    isActive: true,
    displayOrder: 4,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '5',
    code: 'OZ',
    name: 'Ounce',
    symbol: 'oz',
    unitType: UnitType.WEIGHT,
    isBaseUnit: false,
    conversionFactor: 0.0283495,
    description: '1 ounce = 0.0283495 kilograms',
    isActive: true,
    displayOrder: 5,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '6',
    code: 'TON',
    name: 'Metric Ton',
    symbol: 't',
    unitType: UnitType.WEIGHT,
    isBaseUnit: false,
    conversionFactor: 1000,
    description: '1 metric ton = 1000 kilograms',
    isActive: true,
    displayOrder: 6,
    createdAt: new Date('2024-01-01')
  },
  
  // ============================================
  // VOLUME
  // ============================================
  {
    id: '7',
    code: 'L',
    name: 'Liter',
    symbol: 'L',
    unitType: UnitType.VOLUME,
    isBaseUnit: true,
    conversionFactor: 1.0,
    description: 'Base unit for volume in metric system',
    isActive: true,
    displayOrder: 10,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '8',
    code: 'ML',
    name: 'Milliliter',
    symbol: 'mL',
    unitType: UnitType.VOLUME,
    isBaseUnit: false,
    conversionFactor: 0.001,
    description: '1 milliliter = 0.001 liters',
    isActive: true,
    displayOrder: 11,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '9',
    code: 'GAL',
    name: 'Gallon',
    symbol: 'gal',
    unitType: UnitType.VOLUME,
    isBaseUnit: false,
    conversionFactor: 3.78541,
    description: '1 US gallon = 3.78541 liters',
    isActive: true,
    displayOrder: 12,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '10',
    code: 'QT',
    name: 'Quart',
    symbol: 'qt',
    unitType: UnitType.VOLUME,
    isBaseUnit: false,
    conversionFactor: 0.946353,
    description: '1 US quart = 0.946353 liters',
    isActive: true,
    displayOrder: 13,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '11',
    code: 'PT',
    name: 'Pint',
    symbol: 'pt',
    unitType: UnitType.VOLUME,
    isBaseUnit: false,
    conversionFactor: 0.473176,
    description: '1 US pint = 0.473176 liters',
    isActive: true,
    displayOrder: 14,
    createdAt: new Date('2024-01-01')
  },
  
  // ============================================
  // LENGTH
  // ============================================
  {
    id: '12',
    code: 'M',
    name: 'Meter',
    symbol: 'm',
    unitType: UnitType.VOLUME,
    isBaseUnit: true,
    conversionFactor: 1.0,
    description: 'Base unit for length in metric system',
    isActive: true,
    displayOrder: 20,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '13',
    code: 'CM',
    name: 'Centimeter',
    symbol: 'cm',
    unitType: UnitType.VOLUME,
    isBaseUnit: false,
    conversionFactor: 0.01,
    description: '1 centimeter = 0.01 meters',
    isActive: true,
    displayOrder: 21,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '14',
    code: 'MM',
    name: 'Millimeter',
    symbol: 'mm',
    unitType: UnitType.VOLUME,
    isBaseUnit: false,
    conversionFactor: 0.001,
    description: '1 millimeter = 0.001 meters',
    isActive: true,
    displayOrder: 22,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '15',
    code: 'KM',
    name: 'Kilometer',
    symbol: 'km',
    unitType: UnitType.VOLUME,
    isBaseUnit: false,
    conversionFactor: 1000,
    description: '1 kilometer = 1000 meters',
    isActive: true,
    displayOrder: 23,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '16',
    code: 'IN',
    name: 'Inch',
    symbol: 'in',
    unitType: UnitType.LENGTH,
    isBaseUnit: false,
    conversionFactor: 0.0254,
    description: '1 inch = 0.0254 meters',
    isActive: true,
    displayOrder: 24,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '17',
    code: 'FT',
    name: 'Foot',
    symbol: 'ft',
    unitType: UnitType.LENGTH,
    isBaseUnit: false,
    conversionFactor: 0.3048,
    description: '1 foot = 0.3048 meters',
    isActive: true,
    displayOrder: 25,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '18',
    code: 'YD',
    name: 'Yard',
    symbol: 'yd',
    unitType: UnitType.LENGTH,
    isBaseUnit: false,
    conversionFactor: 0.9144,
    description: '1 yard = 0.9144 meters',
    isActive: true,
    displayOrder: 26,
    createdAt: new Date('2024-01-01')
  },
  
  // ============================================
  // COUNT
  // ============================================
  {
    id: '19',
    code: 'PCS',
    name: 'Pieces',
    symbol: 'pcs',
    unitType: UnitType.COUNT,
    isBaseUnit: true,
    conversionFactor: 1.0,
    description: 'Base unit for counting items',
    isActive: true,
    displayOrder: 30,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '20',
    code: 'EACH',
    name: 'Each',
    symbol: 'ea',
    unitType: UnitType.COUNT,
    isBaseUnit: false,
    conversionFactor: 1.0,
    description: 'Individual item',
    isActive: true,
    displayOrder: 31,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '21',
    code: 'DOZ',
    name: 'Dozen',
    symbol: 'doz',
    unitType: UnitType.COUNT,
    isBaseUnit: false,
    conversionFactor: 12,
    description: '1 dozen = 12 pieces',
    isActive: true,
    displayOrder: 32,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '22',
    code: 'BOX',
    name: 'Box',
    symbol: 'box',
    unitType: UnitType.COUNT,
    isBaseUnit: false,
    conversionFactor: 1.0,
    description: 'Box packaging unit',
    isActive: true,
    displayOrder: 33,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '23',
    code: 'CARTON',
    name: 'Carton',
    symbol: 'ctn',
    unitType: UnitType.COUNT,
    isBaseUnit: false,
    conversionFactor: 1.0,
    description: 'Carton packaging unit',
    isActive: true,
    displayOrder: 34,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '24',
    code: 'PALLET',
    name: 'Pallet',
    symbol: 'plt',
    unitType: UnitType.COUNT,
    isBaseUnit: false,
    conversionFactor: 1.0,
    description: 'Pallet load unit',
    isActive: true,
    displayOrder: 35,
    createdAt: new Date('2024-01-01')
  },
  
  // ============================================
  // AREA
  // ============================================
  {
    id: '25',
    code: 'SQM',
    name: 'Square Meter',
    symbol: 'm²',
    unitType: UnitType.AREA,
    isBaseUnit: true,
    conversionFactor: 1.0,
    description: 'Base unit for area in metric system',
    isActive: true,
    displayOrder: 40,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '26',
    code: 'SQFT',
    name: 'Square Foot',
    symbol: 'ft²',
    unitType: UnitType.AREA,
    isBaseUnit: false,
    conversionFactor: 0.092903,
    description: '1 square foot = 0.092903 square meters',
    isActive: true,
    displayOrder: 41,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '27',
    code: 'HECTARE',
    name: 'Hectare',
    symbol: 'ha',
    unitType: UnitType.AREA,
    isBaseUnit: false,
    conversionFactor: 10000,
    description: '1 hectare = 10,000 square meters',
    isActive: true,
    displayOrder: 42,
    createdAt: new Date('2024-01-01')
  },
  
  // ============================================
  // TIME
  // ============================================
  {
    id: '28',
    code: 'HR',
    name: 'Hour',
    symbol: 'hr',
    unitType: UnitType.TIME,
    isBaseUnit: true,
    conversionFactor: 1.0,
    description: 'Base unit for time',
    isActive: true,
    displayOrder: 50,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '29',
    code: 'DAY',
    name: 'Day',
    symbol: 'day',
    unitType: UnitType.TIME,
    isBaseUnit: false,
    conversionFactor: 24,
    description: '1 day = 24 hours',
    isActive: true,
    displayOrder: 51,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '30',
    code: 'WEEK',
    name: 'Week',
    symbol: 'wk',
    unitType: UnitType.TIME,
    isBaseUnit: false,
    conversionFactor: 168,
    description: '1 week = 168 hours',
    isActive: true,
    displayOrder: 52,
    createdAt: new Date('2024-01-01')
  }
];
