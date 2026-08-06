import { Product } from "@/types/product";

/**
 * Returns the primary image of a product.
 */
export function getPrimaryImage(
  product: Product
): string {
  return (
    product.images?.find(
      (image) => image.isPrimary
    )?.url ||
    product.images?.[0]?.url ||
    "/placeholder.png"
  );
}

/**
 * Returns the discount percentage.
 */
export function getDiscount(
  product: Product
): number {
  if (
    !product.mrp ||
    product.mrp <= 0
  ) {
    return 0;
  }

  return Math.round(
    ((product.mrp -
      product.sellingPrice) /
      product.mrp) *
      100
  );
}

/**
 * Returns the current stock.
 */
export function getStock(
  product: Product
): number {
  return product.inventory.stock;
}

/**
 * Returns true if stock is low.
 */
export function isLowStock(
  product: Product
): boolean {
  return (
    product.inventory.stock <=
    product.inventory.minimumStock
  );
}

/**
 * Returns true if product is out of stock.
 */
export function isOutOfStock(
  product: Product
): boolean {
  return (
    product.inventory.stock <= 0
  );
}

/**
 * Returns whether the product is available.
 */
export function isAvailable(
  product: Product
): boolean {
  if (
    !product.inventory.trackInventory
  ) {
    return true;
  }

  if (
    product.inventory
      .continueSelling
  ) {
    return true;
  }

  return (
    product.inventory.stock > 0
  );
}

/**
 * Returns formatted selling price.
 */
export function getSellingPrice(
  product: Product
): string {
  return `₹${product.sellingPrice.toLocaleString(
    "en-IN"
  )}`;
}

/**
 * Returns formatted MRP.
 */
export function getMRP(
  product: Product
): string {
  return `₹${product.mrp.toLocaleString(
    "en-IN"
  )}`;
}

/**
 * Returns profit.
 */
export function getProfit(
  product: Product
): number {
  return (
    product.sellingPrice -
    product.costPrice
  );
}

/**
 * Returns profit margin.
 */
export function getProfitMargin(
  product: Product
): number {
  if (
    product.sellingPrice <= 0
  ) {
    return 0;
  }

  return Number(
    (
      ((product.sellingPrice -
        product.costPrice) /
        product.sellingPrice) *
      100
    ).toFixed(1)
  );
}