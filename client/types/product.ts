export interface ProductImage {
  _id?: string;

  url: string;

  filename: string;

  alt?: string;

  order: number;

  isPrimary: boolean;
}

export interface ProductSEO {
  metaTitle: string;

  metaDescription: string;

  keywords: string;
}

export interface ProductInventory {
  stock: number;

  minimumStock: number;

  trackInventory: boolean;

  continueSelling: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductShipping {
  dispatchTime: string;
  courier?: string;
  packaging?: string;
}

export type ProductStatus =
  | "draft"
  | "published"
  | "archived";

export interface Product {
  _id: string;

  name: string;

  slug: string;

  shortDescription: string;

  description: string;

  category: string;

  anime: string;

  brand: string;

  sku: string;

  mrp: number;

  sellingPrice: number;

  costPrice: number;

  discount: number;

  tax: number;

  featured: boolean;

  trending: boolean;

  newArrival: boolean;

  status: ProductStatus;

  inventory: ProductInventory;

  images: ProductImage[];

  seo: ProductSEO;

  averageRating?: number;

  reviewCount?: number;

  specifications?: ProductSpecification[];

  shipping?: ProductShipping;

  createdAt: string;

  updatedAt: string;
}

export interface ProductFilters {
  page?: number;

  limit?: number;

  search?: string;

  category?: string;

  anime?: string;

  status?: ProductStatus;

  featured?: boolean;
}

export interface ProductsResponse {
  success: boolean;

  products: Product[];

  total: number;

  page: number;

  pages: number;
}

export interface ProductResponse {
  success: boolean;

  product: Product;
}