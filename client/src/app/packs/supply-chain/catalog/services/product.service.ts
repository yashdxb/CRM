// src/app/features/products/services/product.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';
import { Product, Category, UnitOfMeasure, CatalogSupplier } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly suppliers: CatalogSupplier[] = [
    { id: 'sup-001', name: 'Acme Manufacturing Co.' },
    { id: 'sup-002', name: 'BlueRiver Plastics' },
    { id: 'sup-003', name: 'Nova Metals Ltd.' },
    { id: 'sup-004', name: 'Sunrise Textiles' },
    { id: 'sup-005', name: 'Pacific Electronics' }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.generateMockProducts());
  public products$ = this.productsSubject.asObservable();

  constructor() {}

  /**
   * Get all products (mock data for now)
   */
  getProducts(): Observable<Product[]> {
    return of(this.productsSubject.value).pipe(delay(500)); // Simulate API delay
  }

  /**
   * Get product by ID
   */
  getProductById(id: string): Observable<Product | undefined> {
    const product = this.productsSubject.value.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }

  /**
   * Create new product
   */
  createProduct(product: Partial<Product>): Observable<Product> {
    const supplier = this.resolveSupplier(product.supplierId, product.supplierName);

    const newProduct: Product = {
      id: this.generateId(),
      sku: product.sku || this.generateSKU(),
      name: product.name || '',
      description: product.description || '',
      supplierId: supplier.id,
      supplierName: supplier.name,
      categoryId: product.categoryId || '',
      categoryName: product.categoryName || '',
      defaultUOM: product.defaultUOM || UnitOfMeasure.PIECE,
      predictedDemand30Days: product.predictedDemand30Days || 0,
      optimalStockLevel: product.optimalStockLevel || 0,
      currentStockLevel: product.currentStockLevel || 0,
      seasonalityIndex: product.seasonalityIndex || 1.0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: product.isActive !== undefined ? product.isActive : true
    };

    const currentProducts = this.productsSubject.value;
    this.productsSubject.next([...currentProducts, newProduct]);
    
    return of(newProduct).pipe(delay(500));
  }

  /**
   * Update existing product
   */
  updateProduct(id: string, updates: Partial<Product>): Observable<Product | null> {
    const products = this.productsSubject.value;
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return of(null);
    }

    const currentProduct = products[index];
    let supplierId = currentProduct.supplierId;
    let supplierName = currentProduct.supplierName;

    if (updates.supplierId || updates.supplierName) {
      const supplier = this.resolveSupplier(
        updates.supplierId ?? currentProduct.supplierId,
        updates.supplierName ?? currentProduct.supplierName
      );
      supplierId = supplier.id;
      supplierName = supplier.name;
    }

    const updatedProduct = {
      ...currentProduct,
      ...updates,
      supplierId,
      supplierName,
      updatedAt: new Date()
    };

    products[index] = updatedProduct;
    this.productsSubject.next([...products]);
    
    return of(updatedProduct).pipe(delay(500));
  }

  /**
   * Delete product (soft delete by setting isActive to false)
   */
  deleteProduct(id: string): Observable<boolean> {
    const products = this.productsSubject.value;
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return of(false);
    }

    products[index] = {
      ...products[index],
      isActive: false,
      updatedAt: new Date()
    };
    
    this.productsSubject.next([...products]);
    return of(true).pipe(delay(500));
  }

  /**
   * Get categories (mock data)
   */
  getCategories(): Observable<Category[]> {
    return of(this.generateMockCategories()).pipe(delay(300));
  }

  getSuppliers(): Observable<CatalogSupplier[]> {
    return of([...this.suppliers]).pipe(delay(200));
  }

  private resolveSupplier(id?: string | null, name?: string | null): CatalogSupplier {
    if (id) {
      const existing = this.suppliers.find(supplier => supplier.id === id);
      return {
        id,
        name: name ?? existing?.name ?? 'Supplier'
      };
    }

    const fallback = this.suppliers[0] ?? { id: 'supplier-1', name: 'Primary Supplier' };
    return fallback;
  }

  /**
   * Generate mock products
   */
  private generateMockProducts(): Product[] {
    return [
      {
        id: '1',
        sku: 'ELEC-001',
        name: 'Industrial Circuit Board',
        description: 'High-performance circuit board for industrial automation',
        supplierId: this.suppliers[4].id,
        supplierName: this.suppliers[4].name,
        categoryId: '1',
        categoryName: 'Electronics',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 450,
        optimalStockLevel: 500,
        currentStockLevel: 380,
        seasonalityIndex: 1.2,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-10-01'),
        isActive: true
      },
      {
        id: '2',
        sku: 'OFF-001',
        name: 'Premium Paper Reams A4',
        description: '80gsm white office paper, 500 sheets per ream',
        supplierId: this.suppliers[3].id,
        supplierName: this.suppliers[3].name,
        categoryId: '2',
        categoryName: 'Office Supplies',
        defaultUOM: UnitOfMeasure.CARTON,
        predictedDemand30Days: 1200,
        optimalStockLevel: 1500,
        currentStockLevel: 1450,
        seasonalityIndex: 0.9,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-09-28'),
        isActive: true
      },
      {
        id: '3',
        sku: 'RAW-001',
        name: 'Stainless Steel Sheet',
        description: '304 grade stainless steel, 4x8 feet',
        supplierId: this.suppliers[2].id,
        supplierName: this.suppliers[2].name,
        categoryId: '3',
        categoryName: 'Raw Materials',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 85,
        optimalStockLevel: 100,
        currentStockLevel: 45,
        seasonalityIndex: 1.1,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-10-05'),
        isActive: true
      },
      {
        id: '4',
        sku: 'PACK-001',
        name: 'Corrugated Cardboard Boxes',
        description: 'Medium size shipping boxes, 18x12x10 inches',
        supplierId: this.suppliers[1].id,
        supplierName: this.suppliers[1].name,
        categoryId: '4',
        categoryName: 'Packaging',
        defaultUOM: UnitOfMeasure.BOX,
        predictedDemand30Days: 2500,
        optimalStockLevel: 3000,
        currentStockLevel: 2800,
        seasonalityIndex: 1.3,
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-10-07'),
        isActive: true
      },
      {
        id: '5',
        sku: 'ELEC-002',
        name: 'LED Display Panel',
        description: '7-inch industrial touch display',
        supplierId: this.suppliers[4].id,
        supplierName: this.suppliers[4].name,
        categoryId: '1',
        categoryName: 'Electronics',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 120,
        optimalStockLevel: 150,
        currentStockLevel: 95,
        seasonalityIndex: 1.0,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-10-02'),
        isActive: true
      },
      {
        id: '6',
        sku: 'OFF-002',
        name: 'Ballpoint Pens Blue',
        description: 'Professional ballpoint pens, box of 50',
        supplierId: this.suppliers[0].id,
        supplierName: this.suppliers[0].name,
        categoryId: '2',
        categoryName: 'Office Supplies',
        defaultUOM: UnitOfMeasure.BOX,
        predictedDemand30Days: 300,
        optimalStockLevel: 400,
        currentStockLevel: 420,
        seasonalityIndex: 0.8,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-09-30'),
        isActive: true
      },
      {
        id: '7',
        sku: 'RAW-002',
        name: 'Aluminum Extrusion',
        description: '6061-T6 aluminum profile, 6 meters',
        supplierId: this.suppliers[2].id,
        supplierName: this.suppliers[2].name,
        categoryId: '3',
        categoryName: 'Raw Materials',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 200,
        optimalStockLevel: 250,
        currentStockLevel: 180,
        seasonalityIndex: 1.15,
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-10-06'),
        isActive: true
      },
      {
        id: '8',
        sku: 'PACK-002',
        name: 'Bubble Wrap Roll',
        description: 'Heavy-duty bubble wrap, 500mm x 100m',
        supplierId: this.suppliers[1].id,
        supplierName: this.suppliers[1].name,
        categoryId: '4',
        categoryName: 'Packaging',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 180,
        optimalStockLevel: 200,
        currentStockLevel: 210,
        seasonalityIndex: 1.2,
        createdAt: new Date('2024-03-05'),
        updatedAt: new Date('2024-10-04'),
        isActive: true
      },
      {
        id: '9',
        sku: 'ELEC-003',
        name: 'Power Supply Unit 24V',
        description: 'Industrial-grade switching power supply',
        supplierId: this.suppliers[4].id,
        supplierName: this.suppliers[4].name,
        categoryId: '1',
        categoryName: 'Electronics',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 95,
        optimalStockLevel: 120,
        currentStockLevel: 110,
        seasonalityIndex: 1.0,
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-10-03'),
        isActive: true
      },
      {
        id: '10',
        sku: 'OFF-003',
        name: 'Stapler Heavy Duty',
        description: 'Metal stapler for up to 100 sheets',
        supplierId: this.suppliers[0].id,
        supplierName: this.suppliers[0].name,
        categoryId: '2',
        categoryName: 'Office Supplies',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 50,
        optimalStockLevel: 75,
        currentStockLevel: 65,
        seasonalityIndex: 0.9,
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-09-29'),
        isActive: true
      },
      {
        id: '11',
        sku: 'RAW-003',
        name: 'Industrial Adhesive',
        description: 'High-strength epoxy adhesive, 5L container',
        supplierId: this.suppliers[2].id,
        supplierName: this.suppliers[2].name,
        categoryId: '3',
        categoryName: 'Raw Materials',
        defaultUOM: UnitOfMeasure.LITER,
        predictedDemand30Days: 150,
        optimalStockLevel: 200,
        currentStockLevel: 125,
        seasonalityIndex: 1.0,
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-10-08'),
        isActive: true
      },
      {
        id: '12',
        sku: 'PACK-003',
        name: 'Packing Tape Clear',
        description: '48mm x 100m packaging tape, case of 36',
        supplierId: this.suppliers[1].id,
        supplierName: this.suppliers[1].name,
        categoryId: '4',
        categoryName: 'Packaging',
        defaultUOM: UnitOfMeasure.CARTON,
        predictedDemand30Days: 400,
        optimalStockLevel: 500,
        currentStockLevel: 480,
        seasonalityIndex: 1.1,
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-10-01'),
        isActive: true
      },
      {
        id: '13',
        sku: 'ELEC-004',
        name: 'Temperature Sensor',
        description: 'Digital temperature sensor, -40 to 125°C',
        supplierId: this.suppliers[4].id,
        supplierName: this.suppliers[4].name,
        categoryId: '1',
        categoryName: 'Electronics',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 220,
        optimalStockLevel: 250,
        currentStockLevel: 200,
        seasonalityIndex: 1.05,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-10-02'),
        isActive: true
      },
      {
        id: '14',
        sku: 'OFF-004',
        name: 'File Folders Letter Size',
        description: 'Manila file folders, box of 100',
        supplierId: this.suppliers[0].id,
        supplierName: this.suppliers[0].name,
        categoryId: '2',
        categoryName: 'Office Supplies',
        defaultUOM: UnitOfMeasure.BOX,
        predictedDemand30Days: 150,
        optimalStockLevel: 200,
        currentStockLevel: 190,
        seasonalityIndex: 0.85,
        createdAt: new Date('2024-02-12'),
        updatedAt: new Date('2024-09-27'),
        isActive: true
      },
      {
        id: '15',
        sku: 'RAW-004',
        name: 'Plastic Pellets HDPE',
        description: 'High-density polyethylene pellets, 25kg bag',
        supplierId: this.suppliers[1].id,
        supplierName: this.suppliers[1].name,
        categoryId: '3',
        categoryName: 'Raw Materials',
        defaultUOM: UnitOfMeasure.KILOGRAM,
        predictedDemand30Days: 1800,
        optimalStockLevel: 2000,
        currentStockLevel: 1650,
        seasonalityIndex: 1.2,
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-10-07'),
        isActive: true
      },
      {
        id: '16',
        sku: 'ELEC-005',
        name: 'Ethernet Cable CAT6',
        description: 'Network cable CAT6, 305m roll',
        supplierId: this.suppliers[4].id,
        supplierName: this.suppliers[4].name,
        categoryId: '1',
        categoryName: 'Electronics',
        defaultUOM: UnitOfMeasure.METER,
        predictedDemand30Days: 600,
        optimalStockLevel: 700,
        currentStockLevel: 550,
        seasonalityIndex: 0.95,
        createdAt: new Date('2024-02-08'),
        updatedAt: new Date('2024-10-04'),
        isActive: true
      },
      {
        id: '17',
        sku: 'OFF-005',
        name: 'Whiteboard Markers',
        description: 'Dry-erase markers, assorted colors, pack of 12',
        supplierId: this.suppliers[3].id,
        supplierName: this.suppliers[3].name,
        categoryId: '2',
        categoryName: 'Office Supplies',
        defaultUOM: UnitOfMeasure.DOZEN,
        predictedDemand30Days: 80,
        optimalStockLevel: 100,
        currentStockLevel: 95,
        seasonalityIndex: 0.9,
        createdAt: new Date('2024-01-28'),
        updatedAt: new Date('2024-09-26'),
        isActive: true
      },
      {
        id: '18',
        sku: 'RAW-005',
        name: 'Silicone Sealant',
        description: 'Industrial silicone sealant, 310ml cartridge',
        supplierId: this.suppliers[2].id,
        supplierName: this.suppliers[2].name,
        categoryId: '3',
        categoryName: 'Raw Materials',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 320,
        optimalStockLevel: 400,
        currentStockLevel: 350,
        seasonalityIndex: 1.0,
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date('2024-10-05'),
        isActive: true
      },
      {
        id: '19',
        sku: 'PACK-004',
        name: 'Stretch Film Pallet Wrap',
        description: 'Industrial stretch film, 500mm x 300m',
        supplierId: this.suppliers[1].id,
        supplierName: this.suppliers[1].name,
        categoryId: '4',
        categoryName: 'Packaging',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 250,
        optimalStockLevel: 300,
        currentStockLevel: 280,
        seasonalityIndex: 1.15,
        createdAt: new Date('2024-02-28'),
        updatedAt: new Date('2024-10-06'),
        isActive: true
      },
      {
        id: '20',
        sku: 'ELEC-006',
        name: 'Motor Control Unit',
        description: 'Variable frequency drive, 3-phase 2.2kW',
        supplierId: this.suppliers[4].id,
        supplierName: this.suppliers[4].name,
        categoryId: '1',
        categoryName: 'Electronics',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 45,
        optimalStockLevel: 60,
        currentStockLevel: 35,
        seasonalityIndex: 1.1,
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-10-08'),
        isActive: true
      },
      // Inactive product example
      {
        id: '21',
        sku: 'OFF-006',
        name: 'Fax Machine (Discontinued)',
        description: 'Legacy fax machine - no longer sold',
        supplierId: this.suppliers[0].id,
        supplierName: this.suppliers[0].name,
        categoryId: '2',
        categoryName: 'Office Supplies',
        defaultUOM: UnitOfMeasure.PIECE,
        predictedDemand30Days: 0,
        optimalStockLevel: 0,
        currentStockLevel: 5,
        seasonalityIndex: 0.1,
        createdAt: new Date('2023-01-10'),
        updatedAt: new Date('2024-06-15'),
        isActive: false
      }
    ];
  }

  /**
   * Generate mock categories
   */
  private generateMockCategories(): Category[] {
    return [
      {
        id: '1',
        name: 'Electronics',
        description: 'Electronic components and devices',
        level: 1,
        isActive: true
      },
      {
        id: '2',
        name: 'Office Supplies',
        description: 'General office and stationery supplies',
        level: 1,
        isActive: true
      },
      {
        id: '3',
        name: 'Raw Materials',
        description: 'Industrial raw materials and chemicals',
        level: 1,
        isActive: true
      },
      {
        id: '4',
        name: 'Packaging',
        description: 'Packaging materials and supplies',
        level: 1,
        isActive: true
      }
    ];
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Generate unique SKU
   */
  private generateSKU(): string {
    const prefix = 'PROD';
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${random}`;
  }
}
