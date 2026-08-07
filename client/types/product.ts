/* ===========================
   Category
=========================== */

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

/* ===========================
   Images
=========================== */

export interface ProductImage {
  _id?: string;

  url: string;

  filename: string;

  alt?: string;

  order: number;

  isPrimary: boolean;
}

/* ===========================
   Inventory
=========================== */

export interface ProductInventory {
  stock: number;

  minimumStock: number;

  trackInventory: boolean;

  continueSelling: boolean;
}

/* ===========================
   SEO
=========================== */

export interface ProductSEO {
  metaTitle: string;

  metaDescription: string;

  keywords: string;
}

/* ===========================
   Specifications
=========================== */

export interface ProductSpecification {
  label: string;

  value: string;
}

/* ===========================
   Shipping
=========================== */

export interface ProductShipping {
  dispatchTime: string;

  courier?: string;

  packaging?: string;
}

/* ===========================
   Status
=========================== */

export type ProductStatus =
  | "draft"
  | "published"
  | "archived";

/* ===========================
   Product
=========================== */

export interface Product {
  _id: string;

  name: string;

  slug: string;

  shortDescription?: string;

  description: string;

  anime: string;

  category: string | Category;

  brand?: string;

  sku: string;

  barcode?: string;

  supplier?: string;

  warehouse?: string;

  purchasePrice?: number;

  costPrice: number;

  mrp: number;

  sellingPrice: number;

  discount?: number;

  tax?: number;

  featured: boolean;

  trending: boolean;

  newArrival: boolean;

  status: ProductStatus;

  inventory: ProductInventory;

  image?: string;

  images: ProductImage[];

  seo: ProductSEO;

  averageRating?: number;

  reviewCount?: number;

  specifications?: ProductSpecification[];

  shipping?: ProductShipping;

  createdAt: string;

  updatedAt: string;
}

/* ===========================
   Filters
=========================== */

export interface ProductFilters {
  search?: string;

  category?: string;

  anime?: string;

  status?: ProductStatus;

  featured?: string;

  sort?: string;

  page?: number;

  limit?: number;
}

/* ===========================
   Pagination
=========================== */

export interface Pagination {
  page: number;

  pages: number;

  total: number;
}

/* ===========================
   API Responses
=========================== */

export interface ProductsResponse {
  products: Product[];

  page: number;

  pages: number;

  total: number;
}

export interface ProductResponse {
  product: Product;
}