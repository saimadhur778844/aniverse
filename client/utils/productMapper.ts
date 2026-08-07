import {
  Product,
} from "@/types/product";

import {
  ProductFormValues,
} from "@/components/admin/products/ProductForm/types";

export function productToForm(
  product: Product
): Partial<ProductFormValues> {
  return {
    name: product.name,
    slug: product.slug,
    shortDescription:
      product.shortDescription ?? "",
    description:
      product.description,

    category:
      typeof product.category ===
      "string"
        ? product.category
        : product.category._id,

    anime: product.anime,
    brand: product.brand ?? "",
    sku: product.sku,

    mrp: product.mrp,
    sellingPrice:
      product.sellingPrice,
    costPrice:
      product.costPrice,

    discount:
      product.discount ?? 0,
    tax: product.tax ?? 0,

    stock:
      product.inventory.stock,

    minimumStock:
      product.inventory.minimumStock,

    trackInventory:
      product.inventory.trackInventory,

    continueSelling:
      product.inventory.continueSelling,

    featured:
      product.featured,

    trending:
      product.trending,

    newArrival:
      product.newArrival,

    published:
      product.status ===
      "published",

    metaTitle:
      product.seo.metaTitle,

    metaDescription:
      product.seo.metaDescription,

    keywords:
      product.seo.keywords,
  };
}