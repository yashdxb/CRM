import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface Category {
  id: string;
  name: string;
  description: string;
  parentCategoryId: string | null;
  level: number;
  isActive: boolean;
  productCount?: number;
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ToggleSwitchModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: TreeNode[] = [];
  selectedNode: TreeNode | null = null;
  selectedCategory: Category | null = null;
  searchText = '';
  loading = false;
  isEditing = false;
  editForm: FormGroup;
  categoryPath: Category[] = [];
  subcategories: Category[] = [];
  parentCategoryOptions: any[] = [];

  private mockCategories: Category[] = [
    { id: 'cat-001', name: 'Electronics', description: 'Electronic components and devices', parentCategoryId: null, level: 0, isActive: true, productCount: 245 },
    { id: 'cat-002', name: 'Semiconductors', description: 'Chips, ICs, and processors', parentCategoryId: 'cat-001', level: 1, isActive: true, productCount: 89 },
    { id: 'cat-003', name: 'Microcontrollers', description: 'MCUs and embedded processors', parentCategoryId: 'cat-002', level: 2, isActive: true, productCount: 34 },
    { id: 'cat-004', name: 'Memory Chips', description: 'RAM, ROM, Flash storage', parentCategoryId: 'cat-002', level: 2, isActive: true, productCount: 28 },
    { id: 'cat-005', name: 'Passive Components', description: 'Resistors, capacitors, inductors', parentCategoryId: 'cat-001', level: 1, isActive: true, productCount: 156 },
    
    { id: 'cat-006', name: 'Raw Materials', description: 'Base materials for manufacturing', parentCategoryId: null, level: 0, isActive: true, productCount: 178 },
    { id: 'cat-007', name: 'Metals', description: 'Steel, aluminum, copper', parentCategoryId: 'cat-006', level: 1, isActive: true, productCount: 67 },
    { id: 'cat-008', name: 'Steel Alloys', description: 'Stainless, carbon steel', parentCategoryId: 'cat-007', level: 2, isActive: true, productCount: 23 },
    { id: 'cat-009', name: 'Non-Ferrous', description: 'Aluminum, copper, brass', parentCategoryId: 'cat-007', level: 2, isActive: true, productCount: 19 },
    { id: 'cat-010', name: 'Plastics', description: 'Polymer materials', parentCategoryId: 'cat-006', level: 1, isActive: true, productCount: 111 },
    
    { id: 'cat-011', name: 'Mechanical Parts', description: 'Mechanical components', parentCategoryId: null, level: 0, isActive: true, productCount: 203 },
    { id: 'cat-012', name: 'Fasteners', description: 'Bolts, screws, nuts', parentCategoryId: 'cat-011', level: 1, isActive: true, productCount: 145 },
    { id: 'cat-013', name: 'Bearings', description: 'Ball bearings, roller bearings', parentCategoryId: 'cat-011', level: 1, isActive: true, productCount: 58 },
    
    { id: 'cat-014', name: 'Packaging', description: 'Packaging materials', parentCategoryId: null, level: 0, isActive: false, productCount: 42 },
    { id: 'cat-015', name: 'Boxes', description: 'Cardboard and plastic boxes', parentCategoryId: 'cat-014', level: 1, isActive: false, productCount: 28 }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      parentCategoryId: [null],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.buildParentCategoryOptions();
  }

  loadCategories(): void {
    this.categories = this.buildTree(this.mockCategories);
  }

  private buildTree(categories: Category[]): TreeNode[] {
    const map = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];

    categories.forEach(cat => {
      const node: TreeNode = {
        key: cat.id,
        data: {
          id: cat.id,
          name: cat.name,
          description: cat.description,
          level: cat.level,
          isActive: cat.isActive,
          productCount: cat.productCount,
          parentCategoryId: cat.parentCategoryId
        },
        children: [],
        expanded: cat.level === 0
      };
      map.set(cat.id, node);
    });

    categories.forEach(cat => {
      const node = map.get(cat.id);
      if (!node) return;

      if (cat.parentCategoryId) {
        const parent = map.get(cat.parentCategoryId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  private buildParentCategoryOptions(): void {
    const level0And1Categories = this.mockCategories.filter(cat => cat.level < 2);
    
    this.parentCategoryOptions = [
      { label: 'None (Root Category)', value: null },
      ...level0And1Categories.map(cat => ({
        label: `${'  '.repeat(cat.level)}${cat.name} (L${cat.level})`,
        value: cat.id
      }))
    ];
  }

  onNodeSelect(event: any): void {
    if (event.node && event.node.data) {
      const categoryData = event.node.data;
      this.selectedCategory = this.mockCategories.find(c => c.id === categoryData.id) || null;
      
      if (this.selectedCategory) {
        this.isEditing = false;
        this.loadCategoryDetails();
      }
    }
  }

  private loadCategoryDetails(): void {
    if (!this.selectedCategory) return;

    // Build hierarchy path
    this.categoryPath = this.buildCategoryPath(this.selectedCategory);

    // Load subcategories
    this.subcategories = this.mockCategories.filter(
      cat => cat.parentCategoryId === this.selectedCategory!.id
    );
  }

  private buildCategoryPath(category: Category): Category[] {
    const path: Category[] = [category];
    let currentCategory = category;

    while (currentCategory.parentCategoryId) {
      const parent = this.mockCategories.find(c => c.id === currentCategory.parentCategoryId);
      if (parent) {
        path.unshift(parent);
        currentCategory = parent;
      } else {
        break;
      }
    }

    return path;
  }

  selectCategoryById(categoryId: string): void {
    const category = this.mockCategories.find(c => c.id === categoryId);
    if (!category) return;

    // Find and select the node in the tree
    const node = this.findNodeById(this.categories, categoryId);
    if (node) {
      this.selectedNode = node;
      this.selectedCategory = category;
      this.loadCategoryDetails();
    }
  }

  private findNodeById(nodes: TreeNode[], id: string): TreeNode | null {
    for (const node of nodes) {
      if (node.key === id) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  getParentCategoryName(parentId: string | null): string {
    if (!parentId) return 'None (Root Level)';
    const parent = this.mockCategories.find(c => c.id === parentId);
    return parent ? parent.name : 'Unknown';
  }

  navigateToNew(): void {
    this.router.navigate(['/app/products/categories/new']);
  }

  addSubcategory(parentId: string): void {
    this.router.navigate(['/app/products/categories/new'], {
      queryParams: { parentId }
    });
  }

  deleteCategory(categoryId: string): void {
    console.log('Delete category:', categoryId);
    // TODO: Implement delete with confirmation dialog
  }

  startEdit(): void {
    if (!this.selectedCategory) return;

    this.isEditing = true;
    this.editForm.patchValue({
      name: this.selectedCategory.name,
      description: this.selectedCategory.description,
      parentCategoryId: this.selectedCategory.parentCategoryId,
      isActive: this.selectedCategory.isActive
    });
  }

  saveEdit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    if (!this.selectedCategory) return;

    const updatedData = this.editForm.value;
    
    // Update mock data
    const index = this.mockCategories.findIndex(c => c.id === this.selectedCategory!.id);
    if (index !== -1) {
      this.mockCategories[index] = {
        ...this.mockCategories[index],
        ...updatedData
      };
      
      this.selectedCategory = this.mockCategories[index];
      this.loadCategories();
      this.loadCategoryDetails();
      this.isEditing = false;
      
      console.log('Category updated:', this.selectedCategory);
      // TODO: Call API to save changes
    }
  }

  saveCategory(): void {
    this.saveEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editForm.reset();
  }

  expandAll(): void {
    this.categories.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll(): void {
    this.categories.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean): void {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  onSearch(): void {
    if (!this.searchText.trim()) {
      this.loadCategories();
      return;
    }

    const term = this.searchText.toLowerCase();
    const matched = this.mockCategories.filter(cat =>
      cat.name.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term)
    );

    const includeIds = new Set<string>();

    const addWithAncestors = (category: Category): void => {
      let current: Category | undefined = category;
      while (current) {
        if (includeIds.has(current.id)) {
          break;
        }
        includeIds.add(current.id);
        if (!current.parentCategoryId) {
          break;
        }
        current = this.mockCategories.find(cat => cat.id === current!.parentCategoryId);
      }
    };

    matched.forEach(addWithAncestors);

    // If nothing matched, keep the tree empty state instead of showing entire tree.
    if (includeIds.size === 0) {
      this.categories = [];
      return;
    }

    const filtered = this.mockCategories.filter(cat => includeIds.has(cat.id));
    this.categories = this.buildTree(filtered);
    this.expandAll();
  }
}
